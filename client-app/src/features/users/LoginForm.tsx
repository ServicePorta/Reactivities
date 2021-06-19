import { Formik } from "formik";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => userStore.login(values)}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form
          className="ui form"
          onSubmit={handleSubmit}
          autoComplete={"false"}
        >
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput type="password" name="password" placeholder="Password" />
          <Button
            loading={isSubmitting}
            positive
            content="login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
