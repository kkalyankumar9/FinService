import { Box, Text, Image, Button, HStack, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import Footer from "./Footer";
import Poster from "./Middle";
// import Slideshow from "./slid";

import { useContext } from "react";
import { AppContext } from "../Context/Appcontext";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isAuth}=useContext(AppContext)
  return (
    <>

    <Box
     px={4} py={3} position="sticky" top={0} zIndex="docked"
    
      as="nav"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor=""
      boxShadow="md"
      
    
      width={"100%"}
      fontSize= "14px"
    line-height="1.42857143"
    color= "#333"
    background-color=" #fff"
      
    >
      <Box display="flex" alignItems="center" >
        <Image src="https://t4.ftcdn.net/jpg/00/79/77/19/360_F_79771929_dkEtuIuxFdNOlv6Evj1Nj1kaSLgSas34.jpg" alt="Logo" boxSize="40px" mr={4} w={"120px"}/>
        <Text fontWeight="bold" fontSize="xl">
          FinService
        </Text>
      </Box>
      <Box display={{ base: "block", md: "none" }} onClick={onOpen}>
        <HamburgerIcon w={6} h={6} />
      </Box>
      <HStack
        as="ul"
        listStyleType="none"
        spacing={4}
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        alignItems={{ base: "center", md: "center" }}
        justifyContent={{ base: "flex-start", md: "flex-end" }}
        w={{ base: "full", md: "auto" }}
        mt={{ base: 4, md: 0 }}
      >
        <Box as="li">
          <Link to="/invest"><Text textColor={"#8323f1"} fontSize={"28px"} w={"100px"}>Invest</Text> </Link>
        </Box>
        <Box as="li">
          <Link to="/about"><Text textColor={"#8323f1"} fontSize={"28px"} w={"100px"}>About</Text> </Link>
        </Box>
        <Box as="li">
          <Link to="/contact"><Text textColor={"#8323f1"} fontSize={"28px"} w={"100px"}>Contact</Text> </Link>
        </Box>
      </HStack>
      <Box>
        <Box>
      <Button colorScheme="pink"    size="md" width={"200px"}  fontSize={"20px"} gap={"5px"}>
        <Link to="/signup" >Create</Link>
      </Button>
      <Button colorScheme="teal" size="md"  width={"200px"}  fontSize={"20px"}>
        <Link to={"/login"}> Login</Link>
       
      </Button>
      </Box>
      </Box>
      <Box display={{ base: isOpen ? "block" : "none", md: "none" }} position="absolute" top={0} left={0} w="full" h="full" bg="white" pt="80px">
        <HStack as="ul" listStyleType="none" spacing={4} flexDir="column" alignItems="center">
          <Box as="li" onClick={onClose} >
            <Link to="/invest" ><Text textColor={"teal"} fontSize={"28px"} w={"100px"}>Invest</Text> </Link>
          </Box>
          <Box as="li" onClick={onClose}>
            <Link to="/about"><Text textColor={"teal"} fontSize={"28px"} w={"100px"}>About</Text></Link>
          </Box>
          <Box as="li" onClick={onClose}>
            <Link to="/contact"><Text textColor={"teal"} fontSize={"28px"} w={"100px"}>Contact</Text></Link>
          </Box>
        </HStack>
      </Box>
    

    </Box>
   <br />
    <Poster/>

    <Footer/>
    
    
    </>
  );
};

export default Navbar;
