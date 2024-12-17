
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useRef,useState,useEffect } from "react";
import { connect } from "react-redux";
import LogUp from "./logUp";
import ShowTasks from "./showTasks"
import { deleteUser } from "../redux/action";
import Manager from "./manager";
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {getUserList} from "../redux/action"
import axios from 'axios'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    </Typography>
  );
}
const defaultTheme = createTheme();
function mapStateToProps(state){
    return {
      contactList:state.users.contactList,
             taskList:state.tasks.taskList
 }}
 
export default connect(mapStateToProps) (function SignIn(props) {

    const newNavigate=useNavigate()
    const{dispatch,contactList,taskList}=props;
    let id=useRef('');
    let name=useRef('');
    function remove(){
     dispatch(deleteUser(id.current.value));
    }
  const handleSubmit = (event) => {
    console.log("ghtrghth" ,contactList);
    debugger;
    const tempUser=contactList.find(x=>x.id===id.current.value);
    if(tempUser!=null)
    {
       
        if(tempUser.manager===1){
            newNavigate("/manager" )
        }
        else{
        alert(`שלום ${name.current.value}`)
        return newNavigate('/showTasks',{state:{id:id.current.value}})
    }  
    }
    else{
        return newNavigate("/logup")
    }
   }


   const getAllUser=async()=>{
    try{
      const response=await axios.get('http://localhost:5000/users/')
      console.log(response.data);
      if(response.status==200)
      {
        console.log(response.data);
        dispatch(getUserList(response.data))
        // console.log('taskList',taskList);
      }
    }
      catch(error){
        console.error(error)
      }
}
useEffect(()=>{
  getAllUser()
},[])

  return (
    <ThemeProvider theme={defaultTheme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
           
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="שם"
              type="name"
              id="name"
              autoComplete="name"
              inputRef={name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ת.ז"
              name="id"
              autoComplete="id"
              autoFocus
              inputRef={id}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              להתחברות
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  
                </Link>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
})
