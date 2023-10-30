import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [visitorCount, setVisitorCount] = useState(() => {
    const storedVisitorCount = JSON.parse(localStorage.getItem("visitorCount"));
    return storedVisitorCount ? parseInt(storedVisitorCount) : 0;
  });
  useEffect(() => {
    const handleBeforeUnload = () => {
      setVisitorCount((prevCount) => prevCount - 1);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("visitorCount", visitorCount);
    console.log("Visitor Count Updated" + visitorCount);
  }, [visitorCount]);

  const updateVisitorCount = () => {
    setVisitorCount(visitorCount + 1);
  };

  return (
    <div className="App">
      <fieldset>
        <form>
          <b>Your current visitor count is:</b>
          <br />
          <input
            type="button"
            onClick={updateVisitorCount}
            value="Update Visitor"
          />
          <br />
          {visitorCount}
        </form>
      </fieldset>
    </div>
  );
}

export default App;
