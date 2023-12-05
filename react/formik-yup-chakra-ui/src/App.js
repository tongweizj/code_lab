import "./App.css";
import { useState } from "react";
import SignUp from "./signup/SignUp";
import Todo from "./todo/Todo";

function App() {
  return (
    <>
      <SignUp />
      <Todo />
    </>
  );
}

export default App;
