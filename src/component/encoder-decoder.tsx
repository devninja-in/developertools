import React, {useEffect, useState} from "react";

import {Button, createStyles, Grid, makeStyles, TextField, Theme} from "@material-ui/core";
import {MD5, SHA256} from "crypto-js";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import jwt_decode from "jwt-decode";
import "./encoder-decoder.css"


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
        title: {
            flexGrow: 1,
            textAlign: "left",
            color: "black"
        },
    }),
);

function Output(props) {
    const classes = useStyles();

    if(props.operation === 'jwtdecode'){

    } else {

    }

    return (
        <div>
            <Grid container className={classes.grid}>
                <Grid item xs={12}>
                    <CopyToClipboard text={props.output}>
                        <Button className={classes.button} variant={"text"} color={"primary"} size={"small"}
                                onClick={props.copyOutput}>Copy</Button>
                    </CopyToClipboard>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        className={classes.textbox}
                        fullWidth={true}
                        rows={10}
                        variant={"outlined"}
                        multiline={true}
                        contentEditable={false}
                        aria-readonly={true}
                        label={props.outputLabel}
                        value={props.output}
                    />
                </Grid>

            </Grid>

        </div>
    );


}

export default function EncoderDecoder({operation, label}) {

    const [inputText, setInputText] = useState<string>('');
    const [output, setOutput] = useState<string | {}>('');
    const [outputLabel, setOutputLabel] = useState<string>('Output');
    const classes = useStyles();

    useEffect(()=> {
        setInputText('');
        setOutput('');
    }, [operation]);

    const clearInputText = () => {
        setInputText('');
        setOutput('');
        setOutputLabel('Output');
    }

    const copyOutput = () => {

    }

    const handleOperation = (event: any) => {
        setInputText(event.target.value);
        if (inputText === '') {
            setOutput('')
            return;
        }
        if(operation === 'base64encode'){
            base64encode(event);
        } else if (operation === 'base64decode') {
            base64decode(event);
        }
        else if (operation === 'urlencode') {
            urlencode(event);
        }
        else if (operation === 'urldecode') {
            urldecode(event);
        }
        else if (operation === 'md5hash') {
            md5hash(event);
        }
        else if (operation === 'sha256hash') {
            sha356hash(event);
        }
        else if (operation === 'jwtdecode') {
            jwtdecode(event);
        }
    }

    const base64encode = (event: any) => {

        setOutput(btoa(inputText));
        setOutputLabel('Base64 Encoded Value');
    }

    const base64decode = (event: any) => {
        try {
            setOutput(atob(inputText));
        } catch (error) {
            console.log(error)
            setOutput('Failed to decode value')
        }
        setOutputLabel('Base64 Decoded Value');
    }

    const urlencode = (event: any) => {
        setOutput(encodeURIComponent(inputText));
        setOutputLabel('Encoded Value');
    }

    const urldecode = (event: any) => {
        setOutput(decodeURIComponent(inputText));
        setOutputLabel('Decoded Value');
    }

    const md5hash = (event: any) => {
        setOutput(MD5(inputText).toString());
        setOutputLabel('MD5 Hash Value');
    }

    const sha356hash = (event: any) => {
        setOutput(SHA256(inputText).toString());
        setOutputLabel('SHA256 Hash Value');
    }

    const jwtdecode = (event: any) => {
        try {
            const decodedJwt = jwt_decode(inputText);
            setOutput(JSON.stringify(decodedJwt, null, 2));
        } catch (error) {
            setOutput(error.message)
        }
        setOutputLabel('JWT Decoded Value');
    }


    return (
        <div className={classes.root}>
            <br/>
            <Grid container className={classes.grid}>
                <Grid item xs={12}>
                    <Button className={classes.button} variant={"text"} color={"primary"} size={"small"}
                            onClick={clearInputText}>Clear</Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        className={classes.textbox}
                        fullWidth={true}
                        rows={10}
                        variant={"outlined"}
                        multiline={true}
                        label={"Please enter text"}
                        value={inputText}
                        onChange={(event) => handleOperation(event)}
                        onInputCapture={(event) => handleOperation(event)}

                    />
                </Grid>
                <Grid item xs={12}>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Output output={output} outputLabel={outputLabel} operation={operation} copyOutput={copyOutput}/>
                </Grid>

            </Grid>
        </div>

    );
}
