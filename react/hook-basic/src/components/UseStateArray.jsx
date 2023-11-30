import { useState } from "react";

function UseStateArray() {
  const [things, setThings] = useState(["Thing 1", "Thing 2"]);

  function addItem() {
    const newThingText = `Thing ${things.length + 1}`;
    setThings((prevState) => [...prevState, newThingText]); // 修改变量
  }
  const thingsElements = things.map((thing) => <p key={thing}>{thing}</p>);
  return (
    <>
      <div className="card">
        <p>useState Array</p>
        <button onClick={addItem}>Add Item</button>
        {thingsElements}
      </div>
    </>
  );
}

export default UseStateArray;
