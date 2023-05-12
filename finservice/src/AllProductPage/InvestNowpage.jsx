import { Box,Text, Heading, Button, Grid, Image,  Select, Input, Spinner, HStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Appcontext";
import DrawerExample from "./AddFound";
import Iposdata from "./Ipos";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchBar } from "./Searchbar";
import Footer from "../LandingPage/Footer";
const InvestNow = () => {
  const [stock,setStock]=useState([])
  const [loading,setLoading]=useState(true)
  const [location,setLocation]=useState("all")
  const [sortby,setSortby]=useState("")
  const [orderby,setOrderby]=useState("")
  const [searchby,setSearchby]=useState("")
  const [page,setPage]=useState(1)


  useEffect(() => {
    let url = `http://localhost:8080/stocks?_page=${page}&_limit=9&`;
  
    if (location !== 'all') {
      url += `location=${location}&`;
    }
  
    if (sortby && orderby) {
      url += `_sort=${sortby}&_order=${orderby}&`;
    }
  
    if (searchby) {
      url += `q=${searchby}`;
    }
  
    axios.get(url)
      .then((res) => {
        console.log(res.data);
        setStock(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, [location, sortby, orderby, searchby,page]);
  
const {LogOut}=useContext(AppContext)
const navigate=useNavigate()
const handleOut=()=>{
  LogOut()
  navigate("/")
}
const {funds,setFunds}=useContext(AppContext)
const {orders,setOrders}=useContext(AppContext)





const handleBuy = (id, current_price,data) => {
 

  if (funds < current_price) {
    alert(`Insufficient funds. Please add more funds. Balance: ₹${funds.toFixed(2)}`);
    return;
  }

  axios
    .post("http://localhost:8080/orderstock", data)
    .then(() => {
      setFunds(funds - current_price);
      alert("Stock bought successfully");
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to add stock to orders");
    });
};





return (
  <>

  <Box bg={"	gray.50"}>
  <HStack bg="#8F00FF" px={4} py={3} position="sticky" top={0} zIndex="docked" justifyContent={"space-between"}>
      <Box display="flex" alignItems="center" >
        {/* <Image
          src="https://t4.ftcdn.net/jpg/00/79/77/19/360_F_79771929_dkEtuIuxFdNOlv6Evj1Nj1kaSLgSas34.jpg"
          alt="Logo"
          boxSize="40px"
          mr={4}
          w="120px"
        /> */}
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
  <br/>
  <HStack w={"50%"} m="auto"  textAlign={"center"}> 
            
            <Input value={searchby} onChange={(e) => setSearchby(e.target.value)} border={"2px solid teal"}  />
            <SearchIcon/>
            
          </HStack>
       
          <br/>
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 3fr" }}
      gap={4}
      
    >
      <Box>
        <Grid templateColumns="repeat(1, 1fr)" gap={4} alignItems="center" >
          <Box>
            <Text fontSize={"20px"} color={"#8323f1"}>Location</Text>
            <Select
              className="filter-by-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengalore">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>


              {/* Bengaluru,Chennai,Hyderabad,Pune,Ahmedabad,Kolkata */}
              

            </Select>
          </Box>
          <Box>
            <Text fontSize={"20px"} color={"#8323f1"}>Sort by</Text>
            <Select
              className="sort-by"
              value={sortby}
              onChange={(e) => setSortby(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="revenue">revenue</option>
              <option value="current_price">current_price</option>
              <option value="market_cap">market_cap</option>
            </Select>
          </Box>
          <Box>
            <Text fontSize={"20px"} color={"#8323f1"} >Order</Text>
            <Select
              className="order"
              value={orderby}
              onChange={(e) => setOrderby(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="asc">Ascending Order</option>
              <option value="desc">Descending Order</option>
            </Select>
          </Box>
          
        </Grid>
      </Box>

      <Box>
        {loading ? (
          <Box textAlign="center">
            <Spinner size="xl" color="blue.500" />
            <Text>Loading...</Text>
          </Box>
        ) : (
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} >
            {stock.map((e, i) => (
              <Box
                key={e.id}
                borderWidth="1px"
               // borderRadius="2g"
                overflow="hidden"
                p={4}
               // bg={"#FFFFD2"}
                bg="white"
              border="1px solid gray"
              borderRadius="md"
              boxShadow="md"
              >
                <Heading size="md"color="#8F00FF" mb={2} >
                  {e.company_name}
                </Heading>
                <Text mb={2} >
                  Location: {e.location}
                </Text>
                <Text mb={2} >
                  Revenue: ₹{e.revenue}
                </Text>
                <Text mb={2} >
                  Current Price: ₹{e.current_price}
                </Text>
                <Text mb={2} >
                  Market Cap: {e.market_cap}
                </Text>
                <Button mr={2} bg={["#FFFFD2", "blue.300"]} color={["white", "gray.800"]}
                onClick={()=>handleBuy(e.id,e.current_price,e)}
                >
                  BUY
                </Button>
               
                <Box mt={4}>
                <Link to={`/invest/${e.id}`} >More Details</Link>
                </Box>
              </Box>
            ))}
          </Grid>
        )}
            <br />
        <Box >
        <Button onClick={(e)=>setPage(page-1) } color={""} bg={"#8323f1"}>Prev</Button>
        <Button>{page}</Button>
        <Button  onClick={(e)=>setPage(page+1)} bg={"#8323f1"}>Next</Button>
    
      </Box>
      <br />
      </Box>
      
    </Grid>
    </Box>
<Footer/>
    <br />
    
  </>
);
            }

export default InvestNow;