import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import DrawerExample from "../AllProductPage/AddFound";
import { AppContext } from "../Context/Appcontext";
import Footer from "../LandingPage/Footer";
function MoreDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`https://rich-pear-puffer-tux.cyclic.app/stocks/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const navigate = useNavigate();

  const handleOut = () => {
    LogOut();
    navigate("/");
  };
  const {funds,LogOut}=useContext(AppContext)

  return (
    <div>
      <HStack bg="#8F00FF" px={4} py={3} position="sticky" top={0} zIndex="docked" justifyContent={"space-between"}>
      <Box display="flex" alignItems="center" >
        
        <Text fontWeight="bold" fontSize="xl" color="white">
          FinService
        </Text>
      </Box >
      <HStack gap={"50px"}>
      <Text as="h6" color="white" fontWeight="bold">
        <Link to={"/invest"}>     Stock</Link>
   
      </Text>
      <Text as="h6" color="white" fontWeight="bold">
      <Link to={"/ipos"}>   IPOs  </Link>
       
        </Text>
      <Text as="h6" color="white" fontWeight="bold">
      <Link to={"/mutualfound"}>      Mutual Founds  </Link>
       
     </Text>
     <Text as="h6" color="white" fontWeight="bold">
      <Link to={"/order"}>      Orders </Link>
       
     </Text>
     
     
     
     <DrawerExample/>
     <Text as="h6" color="white" fontWeight="bold">
   Balance:₹{funds.toFixed(2)}
       
     </Text>
      </HStack>
      <Button onClick={handleOut} bg=" #C5FAD5" color="black">
        Log Out
      </Button>
      
    </HStack>
          <Box p={6} bg="gray.200" borderRadius="lg">
      <Heading size="md" mb={4}>{data.company_name}</Heading>
      <Text><strong>Location:</strong> {data.location}</Text>
      <Text><strong>Founded year:</strong> {data.founded_year}</Text>
      <Text><strong>Revenue:</strong> {data.revenue}</Text>
      <Text><strong>Number of employees:</strong> {data.number_of_employees}</Text>
      <Text><strong>Current price:</strong> {data.current_price}</Text>
      <Text><strong>Market cap:</strong> {data.market_cap}</Text>
      <Text><strong>PE ratio:</strong> {data.pe_ratio}</Text>
      <Text><strong>High:</strong> {data.high}</Text>
      <Text><strong>Low:</strong> {data.low}</Text>
      <Text><strong>Industry:</strong> {data.industry}</Text>
      <Text><strong>Trading:</strong> {data.trading ? "Yes" : "No"}</Text>
    </Box>
    <br />
    <Footer/>
    </div>
  );
}

export default MoreDetails;
