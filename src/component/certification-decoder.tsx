import React, {useState} from "react";
// import the react-json-view component
import {Button, createStyles, makeStyles, TextField, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            height: 500,
            width: '100%',
            align: 'center',
            alignContent: 'center'
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        textbox: {
            width: '50%',
            align: 'center',
            borderRightWidth: 30,
            borderLeftWidth: 30,
            borderColor: "#FFFFFF",
        },
        button: {
            width: '20%',
            align: 'center',
            margin: '5px'
        },
    }),
);

export default function CertificationDecoder() {

    const [inputText, setInputText] = useState<string>('Test');
    const [decodedText, setDecodedText] = useState<{}>({})
    const classes = useStyles();

    const clearInputText = () => {
        setInputText('');
    }

    const decodeCertificate = (event: any) => {
        setInputText(event.target?.value);
        setDecodedText(JSON.parse(inputText));
    }

    return (
        <div className={classes.root}>
            <br/><br/>
            <TextField
                type="text"
                className={classes.textbox}
                fullWidth={true}
                rows={10}
                variant={"outlined"}
                multiline={true}
                helperText={"Paste certificate here"}
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
            />

            <br/><br/>
            <Button className={classes.button} variant={"contained"} color={"primary"} fullWidth={true}
                    onClick={decodeCertificate}>Decode</Button>
            <Button className={classes.button} variant={"contained"} color={"default"} fullWidth={true}
                    onClick={clearInputText}>Clear</Button>
            <br/><br/>

        </div>

    );
}
