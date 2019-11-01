import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const Slider = ({ images }) => {
  if (images == undefined) {
    return true;
  }
  return (
    <Carousel>
      {images.map(image => {
        return <img src={image} />;
      })}
    </Carousel>
  );
};

export default Slider;
