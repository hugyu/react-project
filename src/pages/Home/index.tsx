import { Button } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleLogoutClick = () => {
    axios.get("/api/logout").then((res) => {
      if (res.data?.data) {
        setIsLogin(false);
        console.log("退出成功");
      } else {
        console.log("退出失败");
      }
    });
    };
    const handleCrawllerClick = () => {
        axios.get("/api/getData").then((res) => {
            if (res.data?.data) {
              
            } else {
              console.log("退出失败");
            }
          });
    }
  useEffect(() => {
    axios.get("/api/isLogin").then((res) => {
      if (res.data?.data) {
        setIsLogin(true);
        console.log("已经登录");
      } else {
        setIsLogin(false);
        console.log("未登录");
      }
    });
  }, []);
  return isLogin ? (
    <div className="home-page">
      <Button type="primary" onClick={handleCrawllerClick}>爬取内容</Button>
      <Button type="primary">展示数据</Button>
      <Button type="primary" onClick={handleLogoutClick}>
        退出
      </Button>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};
export default Home;
