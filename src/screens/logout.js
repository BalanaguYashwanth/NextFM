import React,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from '@firebase/app'

export default function logout(){
    const history = useHistory()

    useEffect(async () => {
        await firebase.auth().signOut()
        .then( (res) => {
            console.log(res)
            history.push('/login')
        })
        .catch(err=>console.log(err))
    },[])
    return(
        <p> logged out...</p>
    )


}