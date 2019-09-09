import React from "react";
import { Layout } from "antd";

import Products from "../Products";

class Home extends React.Component {
  render() {
    const { Content } = Layout;
    return (
      <div>
        <Layout>
          <Content>
            <section class="hero">
              <div class="hero-body">
                <div class="">
                  <h1 class="title is-3">Welcome Admin</h1>
                  <span className="subtitle is-4">Products</span>
                  <Products />
                </div>
              </div>
            </section>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Home;
