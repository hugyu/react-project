import { Button } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    axios.get("/api/isLogin").then((res) => {
      if (res.data?.data) {
        setIsLogin(true);
        console.log("已经登录");
      } else {
        console.log("未登录");
      }
    });
  }, []);
  return isLogin ? (
    <div className="home-page">
      <Button type="primary">爬取内容</Button>
      <Button type="primary">展示数据</Button>
      <Button type="primary">退出</Button>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};
export default Home;
