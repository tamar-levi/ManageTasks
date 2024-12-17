import React, { useRef,useEffect } from "react";
import { connect } from "react-redux";
import { addTask } from "../redux/action";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { display } from "@mui/system";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import {getUserList} from "../redux/action"

function mapStateToProps(state){
    return {contactList:state.users.contactList, 
            typeList:state.tasks.typeList ,   
            taskList:state.tasks.taskList
 }
 }
export default connect(mapStateToProps) (function AddTask(props)
{
    const{dispatch,contactList,typeList,taskList,setShow}=props;
    const location=useLocation();
    const nameTask=useRef('');
    const contactId=useRef('');
    // let taskTypeId=useRef('');
    const taskId=useRef('');
    const contactName=useRef('');

    const newNavigate=useNavigate()

   const add=async()=>{
    debugger
      let temp=contactList.find(x=>x.id===contactId.current.value)
      if(temp==null)
      alert('שמך לא נמצא במאגר');
      else{
      try{
        debugger;
        console.log("miryam",taskTypeId);
        const response=await axios.post('http://localhost:5000/tasks/' ,{taskName:nameTask.current.value,taskId:taskId.current.value,taskTypeId:taskTypeId,contactId:contactId.current.value,contactName:contactName.current.value,done:false});
        console.log("respon",response.data);
        if(response.status==200)
        {
          dispatch(addTask( {taskId:taskId.current.value,taskTypeId:taskTypeId,taskName:nameTask.current.value,contactId:contactId.current.value,contactName:contactName.current.value,done:false}))
          alert("המשימה נוספה בהצלחה")
          debugger
          setShow(0)
        }
      }
      catch(error){
        console.error(error)
      }
    }
    
  }
   
    const [taskTypeId, settaskTypeId] = React.useState("");
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
    const handleChange = (event) => {
        settaskTypeId(typeList.find(x=>x.taskTypeName==event.target.value).taskTypeId);
    };

    return(
        <>

<Stack spacing={3}  alignItems="center" ><br/><br/><br/><br/>
        <TextField  inputRef={nameTask} id="outlined-basic" label="שם המשימה" variant="outlined" />


        <Box sx={{ minWidth: 500 }}>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-autowidth-label">סוג המשימה</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={taskTypeId}
            onChange={handleChange}
            autoWidth
            label="Age"
          >
          {typeList.map(e=>(<MenuItem value={e.taskTypeName}>{e.taskTypeName}</MenuItem> ))}

          </Select>
        </FormControl>
       </Box>

        <TextField  inputRef={contactId} id="outlined-basic" label="ת.ז המבצע" variant="outlined" />
        <TextField  inputRef={contactName} id="outlined-basic" label="שם המבצע" variant="outlined" />
        <TextField  inputRef={taskId} id="outlined-basic" label="ת.ז המשימה" variant="outlined" />




        <Stack direction="row" spacing={3.5}>
        <Button onClick={add} variant="outlined"  >להוספת המשימה</Button>
        <Button onClick={()=>setShow(0)} variant="outlined">חזרה</Button></Stack></Stack> 

       

        </>
    )
        })