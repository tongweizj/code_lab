import React from "react";
export default function Static() {
  const [number, setNumber] = React.useState(1);
  function increment() {
    setNumber((prevNumber) => prevNumber + 1);
  }

  return (
    <>
      <h2>URL</h2>
      <a href="https://google.com">google</a>
    </>
  );
}
