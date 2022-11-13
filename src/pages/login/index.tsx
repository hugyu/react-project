import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./login.css";
interface FormValues {
  password: string;
}
const onFinish = (values: FormValues) => {
  console.log("Received values of form: ", values);
};
function LoginPage() {
  return (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default LoginPage;
