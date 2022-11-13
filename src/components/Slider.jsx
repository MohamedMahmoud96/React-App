/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
const Slider = (props) => {
  const { images } = props;
  const [active, setActive] = useState(0);
  return (
    <div className="slideshow-container">
      {images &&
        images.map((image, index) => (
          // eslint-disable-next-line react/jsx-key
          <div key={image} className={index != active ? "mySlides" : "fade"}>
            <img id="activeImg"  src={image} alt="animal" />
          </div>
        ))}
      {images.length > 1 && (
        <div>
          {/*  eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-static-element-interactions */}

          <a
            className="prev"
            onClick={() => {
              active == 0
                ? setActive(images.length - 1)
                : setActive(active - 1);
            }}
          >
            &#10094;
          </a>
          <a
            className="next"
            onClick={() => {
              images.length - 1 == active
                ? setActive(0)
                : setActive(active + 1);
            }}
          >
            &#10095;
          </a>
        </div>
      )}
    </div>
  );
};

export default Slider;
