import React from 'react'
import { Container, Drawer, makeStyles, Typography, List, ListItem, ListItemText, ListItemIcon, AppBar, Toolbar, Box,LinearProgress } from '@material-ui/core'
import { AddCircleOutline, SubjectOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import {Queue, Headset, Link, ExitToApp, Apartment, } from '@material-ui/icons'

const drawerWidth = 250

const useStyles = makeStyles((theme) => ({

    page: {
        background: '#f9f9f9',
        width: '100%'
    },

    appBar: {
        backgroundColor: 'white',
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: 0,
    },

    drawerpaper: {
        width: drawerWidth,
        flexShrink: 0,
    },

    drawertoppaper: {
        top: 2,
        flex: 1,
        display: 'flex'
    },

    root: {
        display: 'flex'
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

}))


export default function layout({ children }) {
    const styles = useStyles()
    const history = useHistory()

    const items = [
        {
            name: 'Home',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            name:'Episodes',
            icon:<Queue />,
            path:'/episodes' 
        },
        {
            name:'Sponsors',
            icon:<Apartment />,
            path:'sponsors'
        },
        {
            name:'Listen links',
            icon:<Link />,
            path:'/listenlinks'

        },
        {
            name:'Logout',
            icon:<ExitToApp />,
            path:'/logout'
        },
    ]

    return (

        <div className={styles.root}>
            
            <Drawer
                className={styles.drawerpaper}
                variant='permanent'
                anchor='left'
                classes={{ paper: styles.drawerpaper }}
            >
                <Toolbar />
               
                <List>
                    {
                        items.map((item) => (
                            <ListItem button align="center" onClick={() => (history.push(item.path))} key={item.name} >
                                <ListItemIcon  > {item.icon}  </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>

            
            <AppBar position="fixed" elevation={2} className={styles.appBar} >
                <Toolbar>
                <Headset fontSize='default' style={{marginLeft:10}} />
                    <Typography variant="h6" style={{margin:5}}  noWrap>
                        <Box fontStyle="italic" letterSpacing='2'>
                            Exploiting with Teja Kummarikuntla  
                        </Box>
                     </Typography>
                </Toolbar>
                
            </AppBar>
            
            
            <div className={styles.content}>
                <Toolbar />
                {children}
            </div>
            
        </div>
    )
}
