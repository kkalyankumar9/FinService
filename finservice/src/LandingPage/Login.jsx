import React, { useState, useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';

import axios from 'axios';
import { AppContext } from '../Context/Appcontext';
import { Link, useNavigate } from 'react-router-dom';

const baseUrl = 'https://friendly-shorts-jay.cyclic.app';

function Login() {
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const { LogIn } = useContext(AppContext);
  const navigate = useNavigate();

  
  const handleSubmit = (event) => {
    event.preventDefault();

    // make the request to check if the user exists and the password is correct
    const url = `${baseUrl}/usersdata?mobileNo=${mobileNo}&password=${password}`;
    axios.get(url)
      .then(response => {
        // handle the successful response
        const user = response.data[0];
        if (user && user.mobileNo === mobileNo && user.password === password) {
          navigate('/');
          console.log(response.data);
          toast({
            title: 'Login Successful',
            description: 'You have been logged in.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          LogIn(); // update the isAuth state
        } else {
          toast({
            title: 'Login Failed',
            description: 'Please check your mobile number and password and try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch(error => {
        // handle the error
        console.error(error);
        toast({
          title: 'Login Failed',
          description: 'Please check your mobile number and password and try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
    <Box >
    <Box w="400px" mx="auto" mt="50px" p="20px" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="mobile-no">Mobile Number:</FormLabel>
          <Input type="text" id="mobile-no" name="mobileNo" border={"1px solid pink"} value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
        </FormControl>

        <FormControl mt="20px" isRequired>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input type="password" id="password" name="password" border={"1px solid pink"} value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <Button type="submit" colorScheme="blue" mt="20px">Login</Button>
        
        
      
      </form>
      <Button><Link to="/signup" >Sign Up  </Link></Button>
      <Button><Link to="/">Back    </Link></Button>
    </Box>
    </Box>
    </>
  );
}

export default Login;
