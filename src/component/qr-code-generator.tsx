import React, {useState} from "react";
// import the react-json-view component
import {Button, createStyles, Grid, makeStyles, TextField, Theme} from "@material-ui/core";
import QRCode from "react-qr-code";


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
    }),
);

export default function QRCodeGenerator() {

    const [inputText, setInputText] = useState<string>('Sample Text');
    const classes = useStyles();

    const clearInputText = () => {
        setInputText('');
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
                        onChange={(event) => setInputText(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                   <br/>
                </Grid>
                <Grid item xs={12}>
                    <QRCode value={inputText} level={"L"} />
                </Grid>
            </Grid>
        </div>

    );
}
