import React from 'react';
import { Carousel } from 'antd';

interface ImageCarouselProps {
  images: string[];
  height?: string | number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = '400px',
  autoplay = true,
  autoplaySpeed = 3000,
  showDots = true,
  className
}) => {
  const imageStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  const carouselItemStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    overflow: 'hidden',
  };

  return (
    <Carousel 
      arrows = {true}
      autoplay={autoplay ? { dotDuration: true } : false}
      autoplaySpeed={autoplaySpeed}
      dots={showDots}
      className={className}
    >
      {images.map((image, index) => (
        <div key={index} style={carouselItemStyle}>
          <img 
            src={image} 
            alt={`轮播图 ${index + 1}`}
            style={imageStyle}
            loading="lazy"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;