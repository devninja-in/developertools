import React, {useState} from "react";
// import the react-json-view component
import {Button, createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import ReactDiffViewer from 'react-diff-viewer';


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

export default function DiffViewer() {

    const [oldValue, setOldValue] = useState<string>('Sample Old Text');
    const [newValue, setNewValue] = useState<string>('Sample New Text');
    const classes = useStyles();

    const clearInputText = () => {
        setOldValue('');
        setNewValue('');
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
                    <ReactDiffViewer
                        oldValue={oldValue}
                        newValue={newValue}
                        splitView={true}
                        leftTitle={'Old Value'}
                        rightTitle={'New Value'}
                        showDiffOnly={false}
                    />
                </Grid>
            </Grid>
        </div>

);
}
