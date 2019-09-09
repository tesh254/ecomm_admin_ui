import React from "react";
import { Spin } from "antd";

const Loader = () => (
  <div className="flex-center margin-top">
    <Spin size="large" />
  </div>
);

export default Loader;
