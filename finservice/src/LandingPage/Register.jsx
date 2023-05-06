import React, { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
  Text
} from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mobileNo === '' || password === '' || confirmPassword === '') {
      setError('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    axios
      .post('http://localhost:8080/usersdata', {
        mobileNo: mobileNo,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setSuccess('Signup successful!');
        navigate('/login');
        toast({
          title: "Signup successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        setError('Signup failed');
        toast({
          title: "Signup failed.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <div style={{ display: 'flex' ,justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <Box  w="400px" mx="auto" mt="50px" p="20px" borderWidth="1px" borderRadius="lg" boxShadow="lg">

      <form onSubmit={handleSubmit}>
        <FormControl isRequired >
          <FormLabel htmlFor="mobileNo">Mobile Number</FormLabel>
          <Input
            type="text"
            name="mobileNo"
            value={mobileNo}
            onChange={(event) => setMobileNo(event.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </FormControl>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <Button type="submit" mt={4} colorScheme="teal">
          Signup
        </Button>
       
  
      </form>
      <Text color={"teal"}>You have Already registered</Text>
      <Button mt={4} colorScheme="teal">
          <Link to="/login">Login</Link>
        </Button>
        <Box>
          
        <Button><Link to="/">Back    </Link></Button> 
        </Box>
      
      </Box>

    </div>
  
  );
};

export default Signup;
