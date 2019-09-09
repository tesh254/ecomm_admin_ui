import React from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";

const Category = ({ category }) => (
    <Link to={`/products/category/${category}`}>
        <Tag color="grey">{category}</Tag>
    </Link>
);

export default Category;
