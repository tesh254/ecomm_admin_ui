import React from "react";
import { Icon } from "antd";

const Buttons = (props) => 
    <div className="buttons fadeIn">
        <div className="button">
            <label htmlFor="single">
                <Icon type="image" />
            </label>
            <input type="file" id="single" onChange={props.handleImageOnchage} />
        </div>
        <div className="button">
            <label htmlFor="multi">
                <input type="file" id="multi" onChange={props.handleImageOnchage} multiple/>
            </label>
        </div>
    </div>

export default Buttons;
