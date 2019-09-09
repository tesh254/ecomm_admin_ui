import React from "react";
import { Icon } from "antd";
import "./index.css";

const ImageSlider = ({ uri }) => {
  const styles = {
    backgroundImage: `url(${uri})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return <img src={uri} alt="" />;
};

const Arrow = ({ direction, clickFunction, arrowSide }) => (
  <div onClick={clickFunction} className={`slide-arrow ${direction}`}>
    <Icon type={arrowSide} />
  </div>
);

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0
    };

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
    this.previewSlideChange = this.previewSlideChange.bind(this);
  }

  previousSlide = () => {
    const { images } = this.props;
    const lastIndex = images.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({
      currentImageIndex: index
    });
  };

  nextSlide = () => {
    const { images } = this.props;
    const lastIndex = images.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index
    });
  };

  previewSlideChange = index => {
    this.setState({
      currentImageIndex: index
    });
  };

  render() {
    const { currentImageIndex } = this.state;
    const { images } = this.props;
    return (
      <div className="container column is-three-quarter">
        <div>
          <Arrow
            direction="left"
            clickFunction={this.previousSlide}
            arrowSide="left"
          />
          <ImageSlider uri={images[currentImageIndex]} />
          <Arrow
            direction="right"
            clickFunction={this.nextSlide}
            arrowSide="right"
          />
        </div>
        <br/>
        <div className="image-previews">
            {images.length === 0 ? (
              <span className="subtitle is-6">No images uploaded</span>
            ) : (
              <ul className="colums flex-center">
                {images.map((image, i) => (
                  <figure className="image is-48x48">
                    <img src={image} alt="" onClick={() => this.previewSlideChange(i)} />
                  </figure>
                ))}
              </ul>
            )}
          </div>
      </div>
    );
  }
}

export default Carousel;
