import React,{useState, useEffect} from 'react'
import {Typography,Button,TextField, Container, makeStyles} from '@material-ui/core'
import {fb} from '../authentication/authenticate'
import {useHistory} from 'react-router-dom'

const useStyles=makeStyles({
    background:{
        height:'100%',
        width:'100%',
        backgroundColor:'red'
    }
})

export default function login(){
    const history = useHistory()
    const styles=useStyles()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('') 

    function submit(){
        fb.auth().signInWithEmailAndPassword(email,password)
        .then(res=>{
            history.push('/')
            console.log('done')
        })
        .catch(err=>console.log(err))
    }

    return(
        <Container > 
            <form className='middle' >
            <Typography gutterBottom variant='h3' >  Login </Typography>
            <TextField type="email" label="Email Address" onChange={(e) => setEmail(e.target.value)} style={{width:'50%', marginTop:10,marginBottom:10,  }} required  />
            <br />
            <TextField  type="password" label="Password" onChange={(e) => setPassword(e.target.value)}  style={{width:'50%', marginTop:10,marginBottom:10,}}  required />
            <br />
            <Button variant='contained' onClick={submit} style={{ backgroundColor:'#606eff' ,width:'50%', padding:20 ,marginTop:10,marginBottom:10}}> log in  </Button>
            <br />
            <Button > {"Can't Log In?"} </Button>
            </form>
          
        </Container>
    )
}
