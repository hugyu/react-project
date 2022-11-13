import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import request from "../../request";
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
  data: number[];
}
const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState<Data>({});
  const handleLogoutClick = () => {
    request.get("/api/logout").then((res) => {
      const data: boolean = res.data;
      if (data) {
        setIsLogin(false);
      } else {
        message.error("退出失败");
      }
    });
  };
  const handleCrawllerClick = () => {
    request.get("/api/getData").then((res) => {
      const data: boolean = res.data;
      if (data) {
        message.success("爬取成功");
      } else {
        message.error("爬取失败");
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
        const { title, count } = innerItem;
        // 没有这个title
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title);
        }
        tempData[title]
          ? tempData[title].push(count)
          : (tempData[title] = [count]);
      });
    }
    const result: LineData[] = [];
    for (let i in tempData) {
      result.push({
        name: i,
        type: "line",
        data: tempData[i],
      });
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
        data: times,
      },
      yAxis: {
        type: "value",
      },
      series: result,
    };
  };
  useEffect(() => {
    request.get("/api/isLogin").then((res) => {
      const data: boolean = res.data;
      if (data) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
    request.get("/api/showData").then((res) => {
      const data: Data = res.data;
      if (data) {
        setData(data);
      } else {
        setIsLogin(false);
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
