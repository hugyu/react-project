import { Button } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
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
  };
  const getOption: () => echarts.EChartsOption = () => {
    return {
      title: {
        text: "Stacked Line",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
  };
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
      <div className="buttons">
        <Button type="primary" onClick={handleCrawllerClick}>
          爬取
        </Button>
        <Button type="primary" onClick={handleLogoutClick}>
          退出
        </Button>
      </div>
      <ReactEcharts option={getOption()} />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};
export default Home;
