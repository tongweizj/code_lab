// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SignupForm from "./UseFormik";
import ValidateSignupForm from "./Validate";
import VisitedFieldsSignupForm from "./VisitedFields";
const Basic = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
    <br />
    <h1>SignupForm</h1>
    <SignupForm />

    <br />
    <h1>ValidateSignupForm</h1>
    <p>
      Update！ 1. 增加了验证功能！
      <br />
      2. 没有屏蔽html自带的验证功能
      <br />
    </p>
    <ValidateSignupForm />

    <h1>ValidateSignupForm</h1>
    <p>
      Update！
      虽然我们的表单有效，并且我们的用户会看到每个错误，但这对他们来说并不是一个很好的用户体验。由于我们的验证函数针对整个表单的每次击键运行values，因此我们的errors对象包含任何给定时刻的所有验证错误。在我们的组件中，我们只是检查是否存在错误，然后立即将其显示给用户。这很尴尬，因为我们将显示用户尚未访问过的字段的错误消息。大多数时候，我们只想在用户在该字段中输入完毕后显示该字段的错误消息。
      与errors和一样values，Formik
      会跟踪哪些字段已被访问过。它将这些信息存储在一个名为 /
      的对象中，该对象也反映了/touched的形状。的键是字段名称，值是布尔值/
      。valuesinitialValuestouchedtouchedtruefalse
      为了利用touched，我们传递formik.handleBlur给每个输入的onBlurprop。此函数的工作原理与它类似formik.handleChange，它使用name属性来确定要更新哪个字段。
      <br />
    </p>
    <VisitedFieldsSignupForm />
  </div>
);

export default Basic;
