import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { Card, makeStyles, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import { MoreVert, Navigation } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import updatedata from '../middleware/thunk'
import {useHistory} from 'react-router-dom'
import Episodes from './episodes'
import { DataContext } from '../Helper/Context'
import { useContext } from 'react'

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    
})


export function Home() {

    const history = useHistory()
    const {maindatas, setMainDatas} = useContext(DataContext)

    const [index, setIndex] = useState('')
    const details = useSelector(state => state.data)
    const dispatch = useDispatch()
    const styles = useStyles()
    const [datas, setDatas] = useState()
    const [anchorEL, setAnchorEL] = useState(null)
    const [loading, setLoading] = useState(false)

    function handleClick(e,id) {
        setIndex(id)
        setAnchorEL(e.currentTarget)
    }

    function handleClose() {
        setAnchorEL(null)
    }

    function dateformat(obj)
    {
        let dateresult = (obj.split('T')).join(" ")
        return dateresult
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
        async function load()
        {
            setLoading(true)
            await dispatch(updatedata)
            setLoading(false)
        }
        load()
    }, [])

    function editing(data){
        // <DataContext.Provider value={data}>
        //     <Episodes  />
        // </DataContext.Provider>
        setMainDatas(data)
        history.push('/episodes')
        console.log('data',data)
    }

    return (
        <div className='row'>
            {
                !loading ? details.map((data,id) => (
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
                                            <MenuItem onClick={() => {editing(data)} }> Edit </MenuItem>
                                            <MenuItem onClick={() => deleting('episode', data.Episode)}> Delete </MenuItem>
                                        </Menu>
                                    </div>
                                }
                                title={data.Details.Episode_title}
                                subheader={dateformat(data.Details.Release_timestamp)}
                            />

                            <CardMedia
                                component='img'
                                height='140'
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
                )) : 
                <div  className='middle'>
                    <img src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif" alt="loading" />
                </div>
                
            }
           
        </div>
    )
}
