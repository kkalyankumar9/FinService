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
import Ordersipo from "./Odersipo"
import { Link, useNavigate } from "react-router-dom"
import DrawerExample from "./AddFound"
import Footer from "../LandingPage/Footer"

function Orderstock(){
    const {orders,setOrders,funds,setFunds,LogOut}=useContext(AppContext)

    useEffect(()=>{
        axios.get("https://foam-nonstop-existence.glitch.me/orderstock")
        .then((res)=>{
            console.log(res)
            setOrders(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })

    },[])
  
    
const handlesell = (id, current_price,data) => {
     // Check if user has added any funds
     // Check if user has enough funds to buy the stock
        axios.delete(`https://foam-nonstop-existence.glitch.me/orderstock/${id}`)
        .then((res)=>{
            const UpdataOrdersData=orders.filter((e)=>e.id!==id)
            setOrders(UpdataOrdersData)
            alert("Order Sold")
            setFunds(prevFunds => prevFunds + (+current_price));

        })
        
  
     
        .catch((error)=>{
          console.log(error)
        })
      
   
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
       <Heading>Orders Data</Heading>
        <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Ordersdata</TableCaption>
    <Thead>
      <Tr>
        <Th>S.no</Th>
        <Th>Company Name</Th>
        <Th>Location</Th>
        <Th >Revenue</Th>
        <Th>Current Price</Th>
       
        <Th>Sell</Th>
      </Tr>
    </Thead>
    <Tbody>
        {orders.length>0?
            orders.map((e,i)=>(
              
                <Tr key={e.id}>
                    <Td>{i+1}</Td>
                    <Td>   {e.company_name}</Td>
                    <Td>{e.location}</Td>
                    <Td> ₹{e.revenue}</Td>
                    <Td>₹{e.current_price}</Td>
            
                    <Td><Button onClick={()=>handlesell(e.id,e.current_price)}>SELL</Button></Td>
                </Tr>
          
            )):<Text>No Data</Text>
        }
        </Tbody>
 
    
  
  </Table>
</TableContainer>
     <Footer />
    </div>
    </>
}

export default Orderstock
