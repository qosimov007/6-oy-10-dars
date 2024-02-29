import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";





function validate(username, email, password, repassword) {
 
  if (!username || !email || !password) {
    alert("Inputlarga malumot kirilishi shart");
    return false;
  }

  if (username.length < 5) {
    alert("Username kamida 5 ta belgidan iborat bolishi kerak");
    username.current.focus();
    return false;
  }



  if (!username.trim()) {
    alert("Username kiritilishi shart");
    return false;
  }

  
 

  
  if (!password.trim() > 3) {
    alert("Parol kamida 3 belgidan iborat bo'lishi shart");
    return false;
  }

  

  if (password !== repassword) {
    alert("Parollar mos kelmadi. Iltimos, qaytadan kiriting.");
    return false;
  }



  
  

  return true;
}

function Register() {
  const username = useRef('');
  const email = useRef('');
  const password = useRef('');
  const repassword = useRef('');
  const [isLoading, setisLoading]=useState(false);
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
     setisLoading(true);
    const isValid = validate(
      username.current.value,
      email.current.value,
      password.current.value,
     repassword.current.value
    );

   if(isValid){
    const user = {
      username:  username.current.value,
       email: email.current.value,
      password:  password.current.value,
      
    }

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then(response => {
          setisLoading(false);
         return response.json();
        })
        .then(data => {
          console.log(data)
         if( data && data.message == "User registered successfully!"){
          navigate("/login")
          }

          if( data && data.message == "Failed! Username is already in use!"){
            console.log("failed");
            }

            if( data && data.message == "Failed! Email is already in use!"){
              console.log("failed");
              }
        })
        .catch(error => {
          console.error( error);
        });
    
   }

  }

  return (
    <Container>
      <Box sx={{ mx: 'auto', width: 400 }}>
        <Typography textAlign={"center"}>
          <h1>Register page</h1>
          <form>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Username"
              variant="outlined"
              type="text"
              inputRef={username}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              sx={{ my: '2rem' }}
              inputRef={email}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              sx={{ mb: '2rem' }}
              inputRef={password}
            />

       <TextField
              fullWidth
              id="outlined-basic"
              label="Repassword"
              type="password"
              variant="outlined"
              sx={{ mb: '2rem' }}
              inputRef={repassword}
            />
            <Button disabled={isLoading ? true : false} onClick={handleClick} sx={{ mx: 'auto', width: 400 }} variant="contained">
            {isLoading ? "Loading...": "register"}
            </Button>
          </form>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;
