import { fireEvent, render, screen } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm";

describe("Feedback Form", () => {
  test("User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    // 准备工作
    const score = "3";
    const comment = "The pizza crust was too thick";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />); // 完成渲染页面
    
    // 在页面上操作
    const rangeInput = screen.getByLabelText(/Score:/);  // 取到输入框
    fireEvent.change(rangeInput, { target: { value: score } }); // 完成填写

    const textArea = screen.getByLabelText(/Comments:/);  // 取到评论框
    fireEvent.change(textArea, { target: { value: comment } }); // 完成填写

    const submitButton = screen.getByRole("button"); // 取按钮
    fireEvent.click(submitButton); // 完成点击操作

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment,
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass
  const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });
});
