import { Box, Text, Link, Button } from "@chakra-ui/react";
import Footer from "../LandingPage/Footer";

function ContactDetails() {
  return (
    <Box>
    <Box>
      <Text fontWeight="bold" mb={2}>Contact Details:</Text>
      <Box mb={2}>
        <Text as="span" fontWeight="bold">Email: </Text>
        <Link href="mailto:support@example.com">kkalyan2312@gmail.com</Link>
      </Box>
      <Box mb={2}>
        <Text as="span" fontWeight="bold">Phone: </Text>
        <Link href="tel:+1234567890">+918886081842</Link>
      </Box>
      <Box mb={2}>
        <Text as="span" fontWeight="bold">Address: </Text>
        <Text>India</Text>
      </Box>
      
    

    </Box>
   
   
    <Footer/>
    </Box>
  );
}
export default ContactDetails;