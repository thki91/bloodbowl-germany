import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselDefault({ items }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 5000, min: 0 },
      items: 1,
    },
  };

  if (!items?.length) return null;
  return (
    <Carousel
      responsive={responsive}
      showDots={true}
      arrows={false}
      autoPlay={true}
      rewind={true}
      autoPlaySpeed={10000}
      infinite={true}
    >
      {items?.map((item, index) => (
        <div key={`carousel-${index}`}>{item}</div>
      ))}
    </Carousel>
  );
}

export default CarouselDefault;
