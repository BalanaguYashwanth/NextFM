import React,{useState} from 'react'
import {TextField, Button, Typography, makeStyles} from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles({
    input:{
        marginTop:10,
        marginBottom:10,
    }
})

export default function listenlinks(){

    const styles=useStyles()
    const [apple, setApple] = useState('')
    const [google, setGoogle] = useState('')
    const [spotify, setSpotify] = useState('')
    const [overcast, setOvercast] = useState('')
    const [pocketcasts, setPocketcasts] = useState('')
    const [RSS, setRSS] = useState('') 
    const [feedback, setFeedback] = useState('')

    function submit()
    {
        axios.post('https://nextfmapi.herokuapp.com/api/post/listenlinks',{
            Apple_Podcasts:apple,
            Google_Podcasts:google,
            Spotify:spotify,
            Overcast:overcast,
            Pocketcasts:pocketcasts,
            Rss:RSS
        })
        .then(res=>{
            console.log(res)
            setFeedback('updated')
        })
        .catch(err=>{
            console.log(err)
            setFeedback('error')
        })
    }

    return(
        <div>
            <TextField fullWidth label="Apple Podcasts" className={styles.input} onChange={(e)=> setApple(e.target.value)}  />
            <TextField fullWidth label="Google Podcasts" className={styles.input} onChange={(e)=> setGoogle(e.target.value)} />
            <TextField fullWidth label="Spotify"  className={styles.input} onChange={(e)=> setSpotify(e.target.value)}  />
            <TextField fullWidth label='Overcast' className={styles.input} onChange={(e)=> setOvercast(e.target.value)} />
            <TextField fullWidth label='Pocket Casts' className={styles.input} onChange={(e)=> setPocketcasts(e.target.value)} />
            <TextField fullWidth label='RSS' className={styles.input} onChange={(e)=> setRSS(e.target.value)}  />
            <Button variant='contained' className={styles.input} onClick={submit} >  submit </Button>
            <br />
            {feedback}
        </div>
    )
}




