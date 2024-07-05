import { Carousel } from "@material-tailwind/react";
import { useState } from "react";

export default function Hero() {
  const [loop, setLoop] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  return (
    <div className="w-full flex flex-row items-center justify-center mt-5 px-5">
      <Carousel
        loop={loop}
        autoplay={autoplay}
        className="rounded-xl w-full sm:w-[600px] md:w-[800px] lg:w-[900px] h-[200px] sm:h-[300px] md:h-[400px]"
      >
        <img
          src="../img/hero.png"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="../img/hero.png"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="../img/hero.png"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
}
