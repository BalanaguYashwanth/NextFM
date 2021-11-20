import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, makeStyles, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import { MoreVert, Navigation } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import updatedata from '../middleware/thunk'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 0,
        paddingTop: '56.29%',
    }
})

export default function home() {

    const history = useHistory()
    const [index, setIndex] = useState('')
    const details = useSelector(state => state.data)
    const dispatch = useDispatch()
    const styles = useStyles()
    const [datas, setDatas] = useState()
    const [anchorEL, setAnchorEL] = useState(null)

    function handleClick(e,id) {
        setIndex(id)
        setAnchorEL(e.currentTarget)
    }

    function handleClose() {
        setAnchorEL(null)
    }

    async function deleting(object, id) {
        axios.delete('https://nextfmapi.herokuapp.com/api/delete/' + object + '/' + id)
            .then(res =>{
                dispatch(updatedata)
                handleClose()
                console.log(res)
            })
            .catch(err => console.log(err))
         
    }

    useEffect(() => {
        dispatch(updatedata)
    }, [])

    return (
        <div className='row'>
            {
                details && details.map((data,id) => (
                    <div key={data.Episode} className='col-md-3' >
                        <Card style={{ margin: 10, maxWidth: 375, backgroundColor: 'rgb(250, 250, 250)' }} >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" style={{ backgroundColor: 'brown' }} >
                                        {data.Episode}
                                    </Avatar>
                                }

                                action={
                                    <div>
                                        <IconButton onClick={(e) => handleClick(e,id)}>
                                            <MoreVert />
                                        </IconButton>
                                        <Menu
                                            keepMounted
                                            anchorEl={anchorEL}
                                            open={Boolean(anchorEL) && index === id}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={() => history.push('/episodes',data) }> Edit </MenuItem>
                                            <MenuItem onClick={() => deleting('episode', data.Episode)}> Delete </MenuItem>
                                        </Menu>
                                    </div>
                                }
                                title={data.Details.Episode_title}
                                subheader={data.Details.Release_timestamp}
                            />

                            <CardMedia
                                className={styles.media}
                                image={data.Details.Episode_banner}
                            />

                            <CardContent>
                                <Typography variant='body2'>
                                    {data.Details.Episode_desc}
                                </Typography>
                            </CardContent>
                            <CardActions>

                            </CardActions>
                        </Card>
                    </div>
                ))
            }
        </div>
    )
}
