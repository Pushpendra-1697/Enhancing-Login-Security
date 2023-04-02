import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import Home from './Home';

const AllRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/' element={<Home />}></Route>
            </Routes>
        </Box>
    );
}

export default AllRoutes;