import React from "react";
import { Tag } from "antd";

class StockStatus extends React.Component {
    
    handleStockStatus = () => {
        const { quantity } = this.props;
        if (quantity === 0) {
            return <Tag color="red">Out of stock</Tag>
        }
        else if (quantity > 0 && quantity <= 10) {
            return <Tag color="gold">Almost out</Tag>
        }
        else {
            return <Tag color="green">In Stock</Tag>
        }
    }

    render() {
        return (
            <div className="content">
                {this.handleStockStatus()}
            </div>
        )
    }
}

export default StockStatus;
