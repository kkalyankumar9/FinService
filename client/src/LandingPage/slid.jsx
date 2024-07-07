import { useState, useEffect } from 'react';
import { Box, Image } from '@chakra-ui/react';

const images = [
  'https://upstox.com/open-demat-account/assets/images/benefit-2.png',
  'https://upstox.com/open-demat-account/assets/images/benefit-1.png',
  'https://upstox.com/open-demat-account/assets/images/benefit-3.png',
  'https://upstox.com/open-demat-account/assets/images/benefit-4.png',
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
      {images.map((image, i) => (
        <Image
          key={i}
          src={image}
          alt="error"
          boxSize={{ base: '150px', md: '300px' }}
          mb={5}
          mr={{ base: 0, md: 5 }}
          display={index === i ? 'block' : 'none'}
        />
      ))}
    </Box>
  );
};

export default Slideshow;
