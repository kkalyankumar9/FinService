
import { AddIcon } from '@chakra-ui/icons'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Stack,
    Box,
    FormLabel,
    Input,
    Text,
    
    Select,
    Textarea,
  } from '@chakra-ui/react'
import axios from 'axios'
  import React, {  useContext, useState } from 'react'
import { AppContext } from '../Context/Appcontext'
export default function DrawerExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    const [amount,setAmount]=useState("")
    const [mobileno,setMobileno]=useState("")
    const [paymentMode,setpaymentMode]=useState("")
    const [description,setdescription]=useState("")
const {funds,setFunds}=useContext(AppContext)

   
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = { amount, mobileno, paymentMode, description }
    axios.post('https://friendly-shorts-jay.cyclic.app/funds', formData)
      .then(function (response) {
        console.log(response)
      
        setFunds(+funds+(+response.data.amount))
        setAmount("")
        setMobileno("")
        setpaymentMode("")
        setdescription("")
        onClose()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
     


    

  
    return (
      <>
        <Button leftIcon={<AddIcon />} colorScheme='#8A307F'  onClick={onOpen}>
          Add Funds
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='left'
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
           Add Founds
            </DrawerHeader>
            <Text textAlign={"end"} color={'teal'} p={"5px"}>
                Balance Amount:
                {funds.toFixed(2)}
              </Text>
            <DrawerBody>
              <Stack spacing='24px'>
                <form onSubmit={handleSubmit}>
               
                  <FormLabel >Amount</FormLabel>
                  <Input
                
                   type='number'
                    placeholder='Please enter amount'
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                  />
                
            
                  <FormLabel >Mobile No</FormLabel>
                  <Input
                  
                    type="number"
                    placeholder='Please enter Mobile No'
                    value={mobileno}
                    onChange={(e)=>setMobileno(e.target.value)}
                  />
            
  
               
  
                
                  <FormLabel >Select Pay</FormLabel>
                  <Select type="select" defaultValue='UPI'
                  value={paymentMode}
                  onChange={(e)=>setpaymentMode(e.target.value)}
                  >
                    <option value='UPI'>UPI</option>
                    <option value='PayTm'> PayTm</option>

                    <option value='PhonePay'> PhonePay</option>
                    <option value='Gpay'> Gpay</option>
                  </Select>
           
  
              
                  <FormLabel >Description</FormLabel>
                  <Textarea type="description" 
                  value={description}
                  onChange={(e)=>setdescription(e.target.value)}
                  />
                  <br/>
                  <Input type='submit' bg={"green.100"} color={"red"}/>
             
                </form>
              </Stack>
              
            </DrawerBody>
  
            <DrawerFooter borderTopWidth='1px'>

              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
             
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }