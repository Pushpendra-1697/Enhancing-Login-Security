import { Box, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem('email'));
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate('/login');
  };

  if (email === null) {
    return <Navigate to="/login" />
  };
  return (
    <Box textAlign={"center"}>
      <Text fontSize={{ base: "26px", sm: "26px", lg: "25px", xl: "24px", "2xl": "23px" }} color={"green"}>{email}</Text>
      <Button mt="10px" onClick={handleLogout} variant={"outline"} bg="black" color={"red"} fontSize={{ base: "26px", sm: "26px", lg: "25px", xl: "24px", "2xl": "23px" }} p={['10px', '28px', '20px', '28px 17px', '25px 20px']}>Logout</Button>
    </Box>
  );
}

export default Home;