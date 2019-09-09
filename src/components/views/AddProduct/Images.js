import React from "react";
import { Icon } from "antd";

const Images = props =>
  props.images.map((image, i) => (
    <div className="fadein" key={i}>
      <div
        className="delete"
        onClick={() => props.removeImage(image.public_id)}
      >
        <Icon type="trash" />
      </div>
      <img src={image.secure_url} alt="" />
    </div>
  ));

export default Images;
