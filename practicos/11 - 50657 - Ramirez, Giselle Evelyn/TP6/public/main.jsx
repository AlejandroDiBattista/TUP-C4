import React, { useState, useEffect } from "react";
import {  Button, TextField, Typography, Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Register() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error(error);
    }
   };
   return (
   <Container>
       <Typography variant="h4">Register</Typography>
       <form onSubmit={handleSubmit}>
         <TextField
           label="Username"
         value={username}
        onChange={(e) => setUsername(e.target.value)}
         fullWidth
          margin="normal"
         />
         <TextField
           label="Password"
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           fullWidth
           margin="normal"
         />
         <Button type="submit" variant="contained" color="primary">
           Register
         </Button>
       </form>
    </Container>
   );
}

function Login() {
   const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.text();
      if (data === "Login successful") {
        window.location.href = "/info";
      } else {
        alert(data);
      }
     } catch (error) {
      console.error(error);
         }
  };

 return (
   <Container>
     <Typography variant="h4">Login</Typography>
     <form onSubmit={handleSubmit}>
       <TextField
         label="Username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         fullWidth
         margin="normal"
       />
       <TextField
         label="Password"
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         fullWidth
         margin="normal"
       />
       <Button type="submit" variant="contained" color="primary">
         Login
       </Button>
     </form>
   </Container>
 );
 }

 function Info() {
   const [user, setUser] = useState(null);

   useEffect(() => {
     const fetchUser = async () => {
       try {
         const response = await fetch("http://localhost:3000/info");
         const data = await response.json();
         setUser(data.user);
       } catch (error) {
         console.error(error);
       }
     };
    fetchUser();
   }, []);

   if (!user) {
     return <Typography variant="h5">Please login to see this page.</Typography>;
   }

  return (
    <Container>
      <Typography variant="h4">User Information</Typography>
      <Typography>Welcome, {user}!</Typography>
      <Button variant="contained" color="secondary" href="/logout">
        Logout
      </Button>
    </Container>
  );
 }

 export default function App() {
   return (
     <Router>
       <Switch>
         <Route path="/" exact component={Login} />
         <Route path="/register" component={Register} />
         <Route path="/info" component={Info} />
       </Switch>
    </Router>
  );
}
