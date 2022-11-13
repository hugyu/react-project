import { Button } from "antd";
import "./style.css";
const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Button type="primary">爬取内容</Button>
      <Button type="primary">展示数据</Button>
      <Button type="primary">退出</Button>
    </div>
  );
};
export default Home;
