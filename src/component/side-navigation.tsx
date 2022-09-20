import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            top: 65,
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "#3f51b5",
            color: "white"
        },
        "&$selected:hover": {
            backgroundColor: "#3f51b5",
            color: "white"
        },
        "&:hover": {
            backgroundColor: "#3f51b5",
            color: "white"
        }
    },
    selected: {}
})(MuiListItem);

export default function AppDrawer({selectedOperation, openClippedDrawer}) {
    const classes = useStyles();
    const history = useHistory();
    const [selected, setSelected] = useState(selectedOperation);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => handleOnClick(selectedOperation), [selectedOperation]);

    const handleOnClick = (operation) => {
        setSelected(operation);
        if (operation === 'base64encode') {
            history.push('/base64-encode');
        } else if (operation === 'base64decode') {
            history.push('/base64-decode');
        } else if (operation === 'urlencode') {
            history.push('/url-encode');
        } else if (operation === 'urldecode') {
            history.push('/url-decode');
        } else if (operation === 'md5hash') {
            history.push('/md5-hash');
        } else if (operation === 'sha256hash') {
            history.push('/sha256-hash');
        } else if (operation === 'jwtdecode') {
            history.push('/jwt-decode');
        } else if (operation === 'jsoneditor') {
            history.push('/json-editor');
        } else if (operation === 'qrcodegenerator') {
            history.push('/qr-code-generator');
        } else if (operation === 'diffviewer') {
            history.push('/diff-viewer');
        }
    }

    return (

        <Drawer
            className={classes.drawer}
            variant="persistent"
            open={openClippedDrawer}
            classes={{
                paper: classes.drawerPaper,
            }}
        >

            <div className={classes.drawerContainer}>
                <List component="nav" aria-label="Developer Tools">
                    <ListItem button key='Base64 Encode' selected={selected === 'base64encode'} onClick={() => handleOnClick('base64encode')}>
                        <ListItemText primary='Base64 Encode'/>
                    </ListItem>
                    <ListItem button key='Base64 Decode' selected={selected === 'base64decode'} onClick={() => handleOnClick('base64decode')}>
                        <ListItemText primary='Base64 Decode' />
                    </ListItem>
                    <ListItem button key='Url Encode' selected={selected === 'urlencode'} onClick={() => handleOnClick('urlencode')}>
                        <ListItemText primary='URL Encode' />
                    </ListItem>
                    <ListItem button key='Url Decode' selected={selected === 'urldecode'} onClick={() => handleOnClick('urldecode')}>
                        <ListItemText primary='URL Decode' />
                    </ListItem>
                    <ListItem button key='JWT Decode' selected={selected === 'jwtdecode'} onClick={() => handleOnClick('jwtdecode')}>
                        <ListItemText primary='JWT Decode' />
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key='MD5 Hash' selected={selected === 'md5hash'} onClick={() => handleOnClick('md5hash')}>
                        <ListItemText primary='MD5 Hash' />
                    </ListItem>
                    <ListItem button key='SHA 256 Hash' selected={selected === 'sha256hash'} onClick={() => handleOnClick('sha256hash')}>
                        <ListItemText primary='SHA 256 Hash' />
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key='JSON Editor' selected={selected === 'jsoneditor'} onClick={() => handleOnClick('jsoneditor')}>
                        <ListItemText primary='JSON Editor' />
                    </ListItem>
                </List>
                {/*<Divider/>
                <List>
                    <ListItem button key='Diff Viewer' selected={selected === 'diffviewer'} onClick={() => handleOnClick('diffviewer')}>
                        <ListItemText primary='Diff Viewer' />
                    </ListItem>
                </List>*/}
                <Divider/>
                <List>
                    <ListItem button key='QR Code Generator' selected={selected === 'qrcodegenerator'} onClick={() => handleOnClick('qrcodegenerator')}>
                        <ListItemText primary='QR Code Generator' />
                    </ListItem>
                </List>
            </div>
        </Drawer>

    );
}
