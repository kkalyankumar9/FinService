
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Footer from "../LandingPage/Footer";
import { Link, useNavigate } from "react-router-dom";
import DrawerExample from "./AddFound";
import { AppContext } from "../Context/Appcontext";
const initialState = {
  ipoData: [],
  loading: false,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DATA_LOADING":
      return {
        ...state,
        ipoData: [],
        loading: true,
        error: false,
      };
    case "DATA_SUCCESS":
      return {
        ...state,
        ipoData: action.payload,
        loading: false,
        error: false,
      };
    case "DATA_ERROR":
      return {
        ...state,
        ipoData: [],
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

function IpoData() {

  const [state, dispatch] = useReducer(reducer, initialState);
 
  const [searchby,setSearchby]=useState("")
  const [page,setPage]=useState(1)
  useEffect(() => {
    let url = `http://localhost:8080/ipos?_page=${page}&_limit=3&`;
  
   
  
    if (searchby) {
      url += `q=${searchby}`;
    }
  
    axios.get(url)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "DATA_SUCCESS", payload: res.data });
   
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "DATA_ERROR", payload: error.message });
    });
  }, [ searchby,page]);
  
//   useEffect(() => {
//     let url = `http://localhost:8080/ipos?_page=${page}&_limit=5&`;
    
//     if (searchby) {
//         url += `q=${searchby}`;
//       }
//     async function fetchData({searchby}) {
//         dispatch({ type: "DATA_LOADING" });
//         try {
//           const res = await axios.get(url);
//           dispatch({ type: "DATA_SUCCESS", payload: res.data });
//         } catch (error) {
//           dispatch({ type: "DATA_ERROR", payload: error.message });
//           console.error(error);
//         }
//       }
    

//     fetchData();
    
//   }, [searchby,page]);
const {LogOut,funds}=useContext(AppContext)
const navigate=useNavigate()
const handleOut=()=>{
  LogOut()
  navigate("/")
}

  
 
  return (
    <>

    <Box bg="gray.100">

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
  <br />
    <HStack w={"50%"} m="auto"  textAlign={"center"}> 

   
            <Input value={searchby} onChange={(e) => setSearchby(e.target.value)} border={"2px solid teal"}  />
            <SearchIcon/>
            
          </HStack>
       
    <Flex justifyContent="center" bg="gray.100" py={8}>
    <Box width="100%" maxWidth="800px" px={4}>
      {state.loading && (
        <Text fontSize="lg" fontWeight="bold" my={4} color="gray.600">
          Loading...
        </Text>
      )}
      {state.error && (
        <Text fontSize="lg" fontWeight="bold" my={4} color="red.500">
          Error...
        </Text>
      )}
      {!state.loading && !state.error && (
        <>
          <Text fontSize="2xl" fontWeight="bold" my={4}>
            Latest IPOs
          </Text>
          {state.ipoData.map((ipo) => (
            <Box
              key={ipo.id}
              my={4}
              bg="white"
              border="1px solid gray"
              borderRadius="md"
              boxShadow="md"
              p={4}
            >
              <Text fontSize="xl" fontWeight="bold" color="blue.500">
                {ipo.name}
              </Text>
              <Text fontSize="md" color="gray.500" mt={2}>
                {ipo.description}
              </Text>
              <Text fontSize="md" color="gray.500" mt={2}>
                Location: {ipo.location}
              </Text>
              <Flex justifyContent="space-between" mt={4}>
                <Text fontSize="lg" color="green.500">
                  {ipo.symbol}
                </Text>
                <Text fontSize="lg" color="gray.500">
                  {ipo.pricePerShare} per share
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mt={2}>
                <Text fontSize="sm" color="gray.500">
                  {ipo.totalShares} total shares
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {ipo.availableShares} available shares
                </Text>
              </Flex>
              <Button bg={"pink"}>Subscribe</Button>
            </Box>
          ))}
        </>
      )}
    </Box>

  </Flex>
  <br />
  <Box >
        <Button onClick={(e)=>setPage(page-1) } color={""} bg={"#8323f1"}>Prev</Button>
        <Button>{page}</Button>
        <Button  onClick={(e)=>setPage(page+1)} bg={"#8323f1"}>Next</Button>
    
      </Box>
      <br />
<Footer/>
</Box>
  </>
  );
}

export default IpoData;
// "name": "Aptus Value Housing Finance India Limited",
//       "symbol": "APTUS",
//       "description": "A retail-focused housing finance company in India, providing affordable home loans to low- and middle-income customers in semi-urban and rural areas.",
//       "pricePerShare": 353,
//       "totalShares": 27800000,
//       "availableShares": 13900000,
//       "ipoDate": "2021-08-10",
//       "location": "Chennai, Tamil Nadu, India",
{/*  */}