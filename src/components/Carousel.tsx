
import React, { Component } from "react";

type Props = {
  images: string[];
};

type State = {
  active: number;
};

class Carousel extends Component<Props, State>  {
  state :State = {
    active: 0,
  };
  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img id="activeImg" src={images[active]}  alt="animal" />
        <div className="carousel-smaller">
          {images &&
            images.map((image, index) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <img
                key={image}
                src={image}
                alt="animal"
                className={index === active ? "active" : ""}
                onClick={() => this.setState({ active: index })}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
