import "./App.css";
import Static from "./component/Static";
import FeedbackForm from "./component/FeedbackForm";
import Button from "./component/Button";
function App() {
  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  return (
    <div className="App">
      <h1>Unit Test Demo</h1>
      <h2>静态页面元素</h2>
      <Static />
      <h2>Button Unit Test</h2>
      <Button />
      <h2>Form Unit Test</h2>
      <FeedbackForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
