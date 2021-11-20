import React, { useState, useEffect } from 'react'
import { TextField, Typography, Button, makeStyles, MenuItem, Select, InputLabel, FormControl, LinearProgress } from '@material-ui/core'
import axios from 'axios'
import { storage } from '../authentication/authenticate'
import {useParams} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: 10,
        marginBottom: 10,
    },
    formControl: {
        minWidth: 1600,
    },
}))

export default function listeninputs({navigation}) {

    
    const [episodenumber, setEpisodenumber] = useState('')
    const [episodetitle, setEpisodetitle] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [episodedescription, setEpisodedescription] = useState('')
    const [episodebanner, setEpisodebanner] = useState('')
    const [episodesponsor, setEpisodesponsor] = useState('')
    const [guestname, setGuestname] = useState('')
    const [guestimage, setGuestimage] = useState('')
    const [guestdesignation, setGuestdesignation] = useState('')
    const [guestlinkedin, setGuestlinkedin] = useState('')
    const [guesttwitter, setGuesttwitter] = useState('')
    const [otherlinks, setOtherlinks] = useState('')
    const [apple, setApple] = useState('')
    const [google, setGoogle] = useState('')
    const [spotify, setSpotify] = useState('')
    const [feedback, setFeedback] = useState('')
    const [sponsordatas, setSponsordatas] = useState('')
    const [sponsor, setSponsor] = useState('')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        axios.get('https://nextfmapi.herokuapp.com/api/get/sponsor/')
            .then(res => {
                console.log(res.data)
                setSponsordatas(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function send() {
        if (episodebanner!='') {
            axios.post('https://nextfmapi.herokuapp.com/api/post/episode' + '/' + episodenumber, {
                Episode: episodenumber,
                Details: {
                    Episode_number: episodenumber,
                    Episode_title: episodetitle,
                    Release_timestamp: timestamp,
                    Episode_desc: episodedescription,
                    Episode_banner: episodebanner,
                    Episode_sponsor: sponsor,
                    Streamingon: {
                        ApplePodcast: apple,
                        GooglePodcast: google,
                        Spotify: spotify,
                    },
                    guest: {
                        Guest_Name: guestname,
                        Guest_Image: guestimage,
                        Guest_Designation: guestdesignation,
                        Guest_LinkedIn: guestlinkedin,
                        Guest_Twitter: guesttwitter,
                        Guest_Introduction: otherlinks
                    }
                }
            }).then(res => {
                console.log(res)
                setFeedback('updated')
                setTimeout(function () {
                    location.reload()
                }, 1000)
            })
                .catch(err => {
                    console.log(err)
                    setFeedback('error')
                })
        }else{
            setFeedback('please try again')
        }
    }

    function edit(e) {
        console.log(e.target.files[0])
        if (e.target.files[0]) {
            console.log(e.target.files[0])
            const image = e.target.files[0]
            const uploadTask = storage.ref('episode/' + image.name).put(image)
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
                        .ref('episode')
                        .child(image.name)
                        .getDownloadURL()
                        .then(url =>
                            setEpisodebanner(url)
                        )
                }
            )
        }
    }

    const styles = useStyles()

    return (
        <div>
            <Typography variant='h4' style={{ margin: 5 }} > Episode </Typography>
            <TextField label="Episode Number"  className={styles.input} fullWidth onChange={(e) => setEpisodenumber(e.target.value)} />
            <TextField label="Episode Title" className={styles.input} fullWidth onChange={(e) => setEpisodetitle(e.target.value)} />
            <TextField type="datetime-local" style={{ marginTop: 15, marginBottom: 10 }} fullWidth onChange={(e) => setTimestamp(e.target.value)} />
            <TextField label="Episode Description" className={styles.input} fullWidth onChange={(e) => setEpisodedescription(e.target.value)} />

            <FormControl className={styles.formControl}>
                <InputLabel id="demo-simple-select-label"> Episode Sponsor </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sponsor}
                    onChange={(e) => setSponsor(e.target.value)}
                >
                    {
                        sponsordatas && sponsordatas.map((sponsordata, index) => (
                            <MenuItem key={sponsordata.Sponsor_number} value={sponsordatas[index]} >  {sponsordata.Sponsor_title} </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            {/* <TextField label="Episode Sponsor" className={styles.input} fullWidth onChange={(e) => setEpisodesponsor(e.target.value)} /> */}

            <label className={styles.input}>
                <TextField style={{ display: 'none' }} label="Episode Banner" type='file' onChange={(e) => edit(e)} />
                <Button variant='contained' component='span'> Upload Banner </Button>
                <LinearProgress variant="determinate" value={progress} />
            </label>

            <Typography variant='h4' style={{ marginTop: 10 }} > Guest </Typography>
            <TextField label="Guest Name" className={styles.input} fullWidth onChange={(e) => setGuestname(e.target.value)} />
            <TextField label="Guest Image" className={styles.input} fullWidth onChange={(e) => setGuestimage(e.target.value)} />
            <TextField label="Guest Designation" className={styles.input} fullWidth onChange={(e) => setGuestdesignation(e.target.value)} />
            <TextField label="Guest LinkedIn" className={styles.input} fullWidth onChange={(e) => setGuestlinkedin(e.target.value)} />
            <TextField label="Guest Twitter" className={styles.input} fullWidth onChange={(e) => setGuesttwitter(e.target.value)} />
            <TextField label="other links" className={styles.input} fullWidth onChange={(e) => setOtherlinks(e.target.value)} />
            <Typography variant='h4' style={{ marginTop: 10 }} > Listen </Typography>
            <TextField label="Apple Podcast" className={styles.input} onChange={(e) => setApple(e.target.value)} fullWidth />
            <TextField label="Google Podcast" className={styles.input} onChange={(e) => setGoogle(e.target.value)} fullWidth />
            <TextField label="Spotify" className={styles.input} onChange={(e) => setSpotify(e.target.value)} fullWidth />
            <Button onClick={send} className={styles.input} variant="contained"  > submit </Button>
            <p> {feedback} </p>
        </div>
    )
}

