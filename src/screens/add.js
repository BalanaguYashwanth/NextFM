import React, { useState } from 'react'
import { TextField, makeStyles, Button, Typography, LinearProgress } from '@material-ui/core'
import axios from 'axios'
import { storage } from '../authentication/authenticate'

const useStyle = makeStyles({
    input: {
        marginTop: 10,
        marginBottom: 10,
    }
})

export default function add() {
    const styles = useStyle()
    const [sponsor_number, setSponsor_number] = useState('')
    const [sponsor_title, setSponsor_title] = useState('')
    const [sponsor_banner, setSponsor_banner] = useState('')
    const [sponsor_portfolio_url, setSponsor_portfolio_url] = useState('')
    const [feedback, setFeedback] = useState('')
    const [progress, setProgress] = useState(0)

    function submit() {
        if (sponsor_number!='' && sponsor_banner!='' && sponsor_title!='') {
            axios.post('https://nextfmapi.herokuapp.com/api/post/sponsor' + '/' + sponsor_number, {
                Sponsor_number: sponsor_number,
                Sponsor_title: sponsor_title,
                Sponsor_portfolio_url: sponsor_portfolio_url,
                Sponsor_banner: sponsor_banner,
            })
                .then(res => {
                    setFeedback('updated')
                    console.log(res)
                    setTimeout(function () {
                        //setFeedback('')
                        location.reload()
                    }, 2000)
                })
                .catch(err => {
                    setFeedback('error')
                    console.log(err)
                })
        }
        else {
            setFeedback('please try again')
        }
    }

    function photo(e) {
        if (e.target.files[0]) {
            console.log(e.target.files[0])
            const image = e.target.files[0]
            const uploadTask = storage.ref('sponsor/' + image.name).put(image)
            uploadTask.on(
                'state changed',
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress)
                },
                error => { console.log(error) },
                () => {
                    storage
                        .ref('sponsor')
                        .child(image.name)
                        .getDownloadURL()
                        .then(url =>
                            setSponsor_banner(url)
                        )
                }
            )
        }
    }

    return (
        <div>
            <TextField type='number'  label="Sponsor No.*" onChange={(e) => setSponsor_number(e.target.value)} fullWidth className={styles.input} />
            <TextField label='Sponsor Title*' onChange={(e) => setSponsor_title(e.target.value)} fullWidth className={styles.input} />
            <TextField label='Sponsor Portfolio URL' onChange={(e) => setSponsor_portfolio_url(e.target.value)} fullWidth className={styles.input} />
            <TextField label='Sponsor Banner Link*' onChange={(e)=>setSponsor_banner(e.target.value)} fullWidth className={styles.input}/>
            {/* <label>
                <TextField label='Sponsor Banner' type="file" onChange={(e) => photo(e)} fullWidth style={{ display: 'none' }} />
                <Button variant="contained" component="span" >Upload Image</Button>
                <LinearProgress variant="determinate" value={progress} />
            </label> */}
            <br />
            <Button className={styles.input} variant='contained' onClick={submit} > submit </Button>
            <p > {feedback} </p>
        </div>
    )
}
