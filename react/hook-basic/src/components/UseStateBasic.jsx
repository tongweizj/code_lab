import { useState } from "react";

function UseStateBasic() {
  const [count, setCount] = useState(0);
  console.log("count:", count);
  console.log("setCount,", setCount);
  return (
    <>
      <div className="card">
        <p>useState basic vlaue</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default UseStateBasic;
