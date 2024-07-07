import { Box, Heading, Text, Stack, Button } from "@chakra-ui/react";
import Footer from "../LandingPage/Footer";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (     <>
    <Box maxW="xl" mx="auto" my={10} px={6}>
      <Heading as="h1" size="xl" mb={5}>
        About Us
      </Heading>
      <Stack spacing={6}>
        <Text>
          Our trading platform was founded in 2005 with the goal of making
          investing accessible to everyone.
        </Text>
        <Text>
          Today, we serve millions of customers globally, providing them with
          the tools and resources they need to invest with confidence.
        </Text>
        <Text>
          At our core, we believe in transparency, security, and innovation.
          Our platform is designed to provide a seamless experience for our
          customers, whether they're new to investing or seasoned traders.
        </Text>
      </Stack>
      <Button><Link to="/">Back</Link> </Button>
      <br />
     

    </Box>
     <Footer />
</>
  );
};

export default AboutPage;
