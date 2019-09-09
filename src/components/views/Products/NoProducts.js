import React from "react";
import { Link } from "react-router-dom";

const NoProducts = () => (
  <section className="flex-center margin-top">
    <span className="subtitle is-6">
      No products, <Link to="/add-product">add Product</Link>
    </span>
  </section>
);

export default NoProducts;
