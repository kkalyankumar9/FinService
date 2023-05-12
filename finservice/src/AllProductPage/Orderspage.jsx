import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/Appcontext";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import DrawerExample from "./AddFound";
import Footer from "../LandingPage/Footer";

function Orders() {
  const { LogOut, funds } = useContext(AppContext);
  const navigate = useNavigate();

  const handleOut = () => {
    LogOut();
    navigate("/");
  };

  return (<>
    <Box>
      <VStack textAlign="center" margin="auto" justifyContent="center">
        <HStack
          bg="#8F00FF"
          px={4}
          py={3}
          position="sticky"
          top={0}
          zIndex="docked"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <Text fontWeight="bold" fontSize="xl" color="white">
              FinService
            </Text>
          </Box>
          <HStack gap="50px">
            <Text as="h6" color="white" fontWeight="bold">
              <Link to="/invest">Stock</Link>
            </Text>
            <Text as="h6" color="white" fontWeight="bold">
              <Link to="/ipos">IPOs</Link>
            </Text>
            <Text as="h6" color="white" fontWeight="bold">
              <Link to="/mutualfound">Mutual Funds</Link>
            </Text>
            <Text as="h6" color="white" fontWeight="bold">
              <Link to="/order">Orders</Link>
            </Text>
            <DrawerExample />
            <Text as="h6" color="white" fontWeight="bold">
              Balance: ₹{funds.toFixed(2)}
            </Text>
            <Button onClick={handleOut} bg="#C5FAD5" color="black">
              Log Out
            </Button>
          </HStack>
        </HStack>
        <VStack >
        <Button>
          <Link to="/stoksorder">Orderstock</Link>
        </Button>
        <Button >
          <Link to="/iposorder">Ordersipos</Link>
        </Button>
        </VStack>
      </VStack>
     
    </Box>
  
     <Footer />
     </>
  );
}

export default Orders;
