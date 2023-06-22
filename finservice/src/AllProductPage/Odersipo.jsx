import { useContext, useEffect } from "react"
import { AppContext } from "../Context/Appcontext"
import {
    Table,
    Thead,
    Tbody,
    Button,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Text,
    useOptionalPart,
    HStack,
    Box
  } from '@chakra-ui/react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import DrawerExample from "./AddFound"
import Footer from "../LandingPage/Footer"

function Ordersipo(){
    const {orders,setOrders,funds,setFunds,LogOut}=useContext(AppContext)

    useEffect(()=>{
        axios.get(`https://friendly-shorts-jay.cyclic.app/ordersipo`)
        .then((res)=>{
            console.log(res)
            setOrders(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })

    },[])
  
    
const handlesell = (id, pricePerShare,data) => {
  axios.delete(`http://localhost:8080/ordersipo/${id}`)
  .then((res)=>{
      const UpdataOrdersData=orders.filter((e)=>e.id!==id)
      setOrders(UpdataOrdersData)
      alert("Order Sold")
      
      setFunds(prevFunds => prevFunds + (+pricePerShare));
  })
  


  .catch((error)=>{
    console.log(error)
  })

    // if (funds >= 0) { // Check if user has added any funds
    //   if (funds >= pricePerShare) { // Check if user has enough funds to buy the stock
       
    //   } else {
    //     alert(`Insufficient funds. Please add more funds. Balance: ₹${funds.toFixed(2)}`); // Display an error message to the user
    //   }
    // } else {
    //   alert("Please add funds"); 
    // }
  };
  const navigate = useNavigate();

  const handleOut = () => {
    LogOut();
    navigate("/");
  };

    return<>
    <div>
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
       <Heading>Subcribed Data</Heading>
        <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Subcribed Data</TableCaption>
    <Thead>
      <Tr>
        <Th>S.no</Th>
        <Th>Company Name</Th>
        <Th>Location</Th>
   
        <Th>Per share</Th>
        <Th >total shares</Th>
        <Th>Available shares</Th>
        <Th>Sell</Th>
      </Tr>
    </Thead>
    <Tbody>
        {orders.length>0?
            orders.map((e,i)=>(
              
                <Tr key={e.id}>
                    <Td>{i+1}</Td>
                    <Td>{e.name}</Td>
                    <Td>{e.location}</Td>
                  <Td>{e.pricePerShare}</Td>
                  <Td>{e.totalShares}</Td>
                  <Td>{e.availableShares}</Td>
                    <Td><Button onClick={()=>handlesell(e.id,e.pricePerShare)}>SELL</Button></Td>
                </Tr>
          
            )):<Text>No Orders</Text>
        }
        </Tbody>
        {/* "pricePerShare": 50,
      "totalShares": 5000000,
      "availableShares": 2500000, */}
    
  
  </Table>
</TableContainer>

        
    </div>
    <Footer/>
    </>
}

export default Ordersipo
