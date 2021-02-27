import {createStyles, Divider, Grid, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import React from "react";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            height: 500,
            width: '100%',
            alignContent: 'center'
        },
        grid: {
            width: '100%',
            align: 'right',
            margin: '0 auto',
        },
        textbox: {
            width: '100%',
            align: 'center',
            borderColor: "#FFFFFF",
        },
        button: {
            width: '5%',
            float: 'right',
            textTransform: 'none',
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'start',
            color: theme.palette.text.secondary,
        },
        title: {
            flexGrow: 1,
            textAlign: "left",
            fontSize: 24,
        },
        description: {
            flexGrow: 1,
            textAlign: "left",
            fontSize: 14,
        },
    }),
);


export default function Home() {

    const classes = useStyles();
    const history = useHistory();

    const handleOnClick = (operation) => {

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

    const ToolCard = (props) => {
        return (
            <Grid item lg={4} md={6} xs={12} onClick={() => handleOnClick(props.operation)}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h5" className={classes.title}>
                        {props.title}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1" className={classes.description}>
                        {props.body}
                    </Typography>
                </Paper>
            </Grid>
        );
    }

    return (
        <div className={classes.root}>
            <br/><br/>
            <Grid container className={classes.grid} spacing={3} wrap={"wrap"}>

                <ToolCard operation={'base64encode'} title={'Base64 Encode'} body={'Encode text using base64 encoding'}/>
                <ToolCard operation={'base64decode'} title={'Base64 Decode'} body={'Decode BASE64 encode' +
                ' text'}/>
                <ToolCard operation={'urlencode'} title={'URL Encode'} body={'Encode text using URL' +
                ' encoding'}/>



                <ToolCard operation={'urldecode'} title={'URL Decode'} body={'Decode URL encoded text'}/>
                <ToolCard operation={'jwtdecode'} title={'JWT Decode'} body={'Decode JWT (JSON Web Token)'}/>
                <ToolCard operation={'md5hash'} title={'MD5 Hash'} body={'Text to MD5 hash'}/>


                <ToolCard operation={'sha256hash'} title={'SHA256 Hash'} body={'Text to SHA256 hash'}/>
                <ToolCard operation={'jsoneditor'} title={'JSON Editor'} body={'Parse, format, validate,' +
                ' and query JSON'}/>
                <ToolCard operation={'qrcodegenerator'} title={'QR Code Generator'} body={'Text to QR code' +
                ' generator'}/>

            </Grid>

        </div>

    );
}
