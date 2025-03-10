import { Spin } from "antd";

const Loading = () => {
  return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spin tip="Loading" size="large"></Spin>
      </div>
  );
};
export default Loading;
