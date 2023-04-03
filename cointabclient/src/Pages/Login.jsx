import React, { useState } from 'react';
import { AiOutlineGoogle, AiOutlineTwitter, AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { Box, Heading, Input, Text } from '@chakra-ui/react';



const initialState = {
  email: '',
  password: ''
};


const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();


  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    let { email, password } = formData;
    if (email == '' || password == '') {
      alert('Please Fill * required Field')
      return;
    };


    try {
      let res = await fetch(`${backend_url}/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "email": email
        }
      });
      res = await res.json();
      if (res.msg == "Blocked") {
        alert(`You are Blocked for 24 Hours`);
        return;
      };
    } catch (err) {
      console.log(err);
    };


    try {
      let res = await fetch(`${backend_url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      res = await res.json();
      if (res) {
        if (res.msg === "Wrong Password") {
          alert(`${res.msg}`);
        } else if (res.msg === "Wrong Email ID") {
          alert(`${res.msg}`);
        } else if (res.msg === "Login Successful") {
          localStorage.setItem('email', formData.email);
          alert(`${res.msg}`);
          navigate('/');
        }
      };

      setFormData({
        email: '',
        password: ''
      });
    } catch (err) {
      console.log(err);
    }
  };


  const { email, password } = formData;

  return (
    <Box style={{ textAlign: 'center' }}>
      <Heading mb="10px" style={{ textAlign: "center" }}>Login For Existing Users</Heading>
      <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
        <Box className='input-icons'>
          <i class="fa fa-envelope icon"></i>
          <Input className='input-field' w="300px" type={"email"} placeholder="Email" value={email} name="email" onChange={handleChange} />
          {email.includes('@gmail.com') == false ? <Text color={"red"}>Invalid Email*</Text> : null}
        </Box>
        <Box className='input-icons'>
          <i class="fa fa-key icon"></i>
          <Input className='input-field' w="300px" type={"password"} value={password} name="password" placeholder='Password' onChange={handleChange} />
        </Box>

        <Input w="300px" style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "10px", padding: "10px" }} type={"submit"} />

      </form>
      <p style={{ marginTop: "14px" }}>or continue with these social profile</p>

      <Box m="0px 0 8px 0" display={"flex"} justifyContent="center" alignItems={"center"} gap="5px">
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineGoogle /></a>
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillFacebook /> </a>
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineTwitter /> </a>
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillGithub /></a>
      </Box>
      <p>Cerate an account? <Link style={{ textDecoration: "none", color: "green" }} to={'/register'}>Register</Link></p>
    </Box>
  );
}

export default Login;