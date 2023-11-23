import "./App.css";
import FeedbackForm from "./FeedbackForm";

function App() {
  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  return (
    <div className="App">
      <h1>Little Lemon Restaurant</h1>
      <FeedbackForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
