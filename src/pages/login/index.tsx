import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import qs from "qs";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./style.css";
interface FormValues {
  password: string;
}

function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const onFinish = (values: FormValues) => {
    axios
      .post("/api/login", qs.stringify({ password: values.password }), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        if (res.data?.data) {
          setIsLogin(true);
        } else {
          message.error("登录失败");
        }
      });
    };
    // return (
    //     <div className="login-page">
    //   <Form
    //     name="normal_login"
    //     className="login-form"
    //     initialValues={{ remember: true }}
    //     onFinish={onFinish}
    //   >
    //     <Form.Item
    //       name="password"
    //       rules={[{ required: true, message: "Please input your Password!" }]}
    //     >
    //       <Input
    //         prefix={<LockOutlined className="site-form-item-icon" />}
    //         type="password"
    //         placeholder="Password"
    //       />
    //     </Form.Item>
    //     <Form.Item>
    //       <Button
    //         type="primary"
    //         htmlType="submit"
    //         className="login-form-button"
    //       >
    //         Log in
    //       </Button>
    //     </Form.Item>
    //   </Form>
    // </div>
    // )
  return !isLogin ? (
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
  ) : (
    <Navigate to={"/"} />
  );
}
export default LoginPage;
