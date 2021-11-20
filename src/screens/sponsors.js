import React, { useEffect, useState } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, makeStyles, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { MoreVert, Link } from '@material-ui/icons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import updatedata from '../middleware/thunk'
import uploadfile from './uploadfile'
import { storage } from '../authentication/authenticate'

const useStyles = makeStyles({

    input: {
        marginTop: 10,
        marginBottom: 10
    },

    image: {
        paddingTop: '56.29%',
        height: 0,
    }

})


export default function Sponsors() {

    const details = useSelector(state => state.sponsordata)
    const dispatch = useDispatch()
    const history = useHistory()
    const [datas, setDatas] = useState('')
    const styles = useStyles()
    const [anchorEL, setAnchorEL] = useState('')
    const [index, setIndex] = useState('')
    const [dialog, setDialog] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [progress, setProgress] = useState('')

    const [sponsor_number, setSponsor_number] = useState('')
    const [sponsor_title, setSponsor_title] = useState('')
    const [sponsor_banner, setSponsor_banner] = useState('')
    const [sponsor_url, setSponsor_url] = useState('')

    useEffect(() => {
        dispatch(updatedata)
    }, [])

    function add() {
        history.push('add')
    }

    function handleClick(e, id) {
        console.log(e, id)
        setIndex(id)
        setAnchorEL(e.currentTarget)
    }

    function handleClose() {
        setAnchorEL('')
    }

    function dialogOpen(number) {
        setDialog(true)
        setSponsor_number(number)
        for(let obj in details)
        {
            if(details[obj].Sponsor_number==number)
            {
                setSponsor_title(details[obj].Sponsor_title)
                setSponsor_url(details[obj].Sponsor_url)
                setSponsor_banner(details[obj].Sponsor_banner)
            }
        }
    }

    function dialogClose() {
        setDialog(false)
    }

    function deleting(object, id) {
        console.log(object, id)
        axios.delete('https://nextfmapi.herokuapp.com/api/delete/' + object + '/' + id)
            .then(res => {
                dispatch(updatedata)
                handleClose()
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    function submitEdit() {
        axios.post('https://nextfmapi.herokuapp.com/api/post/sponsor' + '/' + sponsor_number, {
            Sponsor_number: sponsor_number,
            Sponsor_title: sponsor_title,
            Sponsor_banner: sponsor_banner,
            Sponsor_url: sponsor_url
        })
            .then(res => {
                console.log(res)
                dialogClose()
                dispatch(updatedata)
            })
            .catch(err => {
                console.log('dialog error', err)
                dialogClose()
            })
    }

    function image(e) {
        const file = e.target.files[0]
        const uploadTask = storage.ref('sponsor/' + file.name).put(file)
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
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        setSponsor_banner(url)
                    }
                    )
            }
        )
    }

    return (
        <div >
            <Button variant="contained" onClick={add} style={{ float: 'right' }}> add </Button>
            <div className='row'>
                {
                    details && details.map((data, id) => (
                        <div key={data.Sponsor_number} className='col-md-3'>
                            <Card style={{ margin: 10, maxWidth: 375, backgroundColor: 'rgb(250, 250, 250)' }} >
                                <CardHeader
                                    avatar={
                                        <Avatar style={{ backgroundColor: 'brown' }}>
                                            {data.Sponsor_number}
                                        </Avatar>
                                    }

                                    action={
                                        <div>
                                            <IconButton onClick={(e) => (handleClick(e, id))} >
                                                <MoreVert />
                                            </IconButton>

                                            <Menu
                                                keepMounted
                                                id={data.Sponsor_number}
                                                anchorEl={anchorEL}
                                                open={Boolean(anchorEL) && index === id}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={() => dialogOpen(data.Sponsor_number)} > Edit  </MenuItem>
                                                <MenuItem onClick={() => deleting('sponsor', data.Sponsor_number)} > Delete  </MenuItem>
                                            </Menu>

                                        </div>
                                    }
                                    title={data.Sponsor_title}
                                />

                                <CardMedia
                                    className={styles.image}
                                    image={data.Sponsor_banner}
                                />
                                <CardContent>
                                    References: <a href={data.Sponsor_url} > link </a>
                                </CardContent>
                            </Card>


                        </div>
                    ))
                }
            </div>

            <div>
                <Dialog open={dialog} onClose={dialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle> Edit  </DialogTitle>
                    <DialogContent>
                        <DialogContentText> To Edit to this episode, please enter your details. It will be updated. </DialogContentText>
                        <TextField label='Sponsor Title' value={sponsor_title}  onChange={(e) => { setSponsor_title(e.target.value) }} fullWidth className={styles.input} />
                        <TextField label='Sponsor Protofolio Url' value={sponsor_url} onChange={(e) => { setSponsor_url(e.target.value) }} fullWidth className={styles.input} />
                        <label className={styles.input}>
                            <TextField style={{ display: 'none' }}  type='file' label='Sponsor Banner' onChange={(e) => { image(e) }} fullWidth className={styles.input} />
                            <Button variant="contained" component='span' > Upload Image </Button>
                            <p>  {progress} </p>
                        </label>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={dialogClose} > cancel </Button>
                        <Button onClick={submitEdit} > submit </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
// {
//     details.map((detail,id) => (
//         <MenuItem key={detail.Sponsor_number} onClick={() => deleting('sponsor', detail.Sponsor_number)} > Delete {detail.Sponsor_number}  </MenuItem>
//     ))
// }
