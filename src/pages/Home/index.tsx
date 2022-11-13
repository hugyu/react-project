import { Button } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import monent from "moment";
import "./style.css";
interface CourseItem {
  title: string;
  count: number;
}
interface Data {
  [key: string]: CourseItem[];
}
interface LineData {
  name: string;
  type: any;
  data:number[]
}
const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState<Data>({});
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
    const courseNames: string[] = [];
    const times: string[] = [];
    const tempData: { [key: string]: number[] } = {};
    for (let i in data) {
      const item = data[i];
      times.push(monent(Number(i)).format("MM-DD HH:mm"));
      item.forEach((innerItem) => {
        const {title,count}=innerItem
        // 没有这个title
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title);
        }
        tempData[title]
          ? tempData[title].push(count)
          : (tempData[title] = [count]);
      });
    }
    const result:LineData[] = []
      for (let i in tempData) {
          result.push({
              name: i,
              type: "line",
              data:tempData[i]
          })
      }
    return {
      title: {
        text: "课程在线学习人数",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: courseNames,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: times
      },
      yAxis: {
        type: "value",
      },
      series: result
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
    axios.get("/api/showData").then((res) => {
      if (res.data?.data) {
        setData(res.data.data);
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
