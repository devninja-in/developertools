import React from 'react';
import {useHistory} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AppBar, Button, Toolbar, Typography, IconButton} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            textAlign: "left"
        },
        button: {
            textTransform: 'none',
        },
    }),
);

export default function AppHeader({openClippedDrawer, setOpenClippedDrawer}) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu onClick={() => setOpenClippedDrawer(!openClippedDrawer)}/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
                        Developer Tools
                    </Typography>
                    {/*<Button color="inherit" onClick={() => history.push('/encode-decode')}>Encode/Decode</Button>
                    <Button color="inherit" onClick={() => history.push('/json-editor')}>Json</Button>
                    */}
                    <div data-tip="support@devninja.in" data-for='contact-us-tooltip' data-place='bottom'>
                        <Button className={classes.button}  variant={"text"} color="inherit" onClick={() => window.location.href='mailto:support@devninja.in'}>Contact Us</Button>
                    </div>
                    <ReactTooltip id="contact-us-tooltip" clickable/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
