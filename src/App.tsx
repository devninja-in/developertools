import React, {useState} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {isMobile} from "react-device-detect";

import Home from "./component/home";
import AppHeader from "./component/header";

import JsonEditor from "./component/json-editor";
import EncodeDecodeProcessor from "./component/encoder-decoder";
import CertificationDecoder from "./component/certification-decoder";
import AppDrawer from "./component/side-navigation";
import CssBaseline from "@material-ui/core/CssBaseline";
import QRCodeGenerator from "./component/qr-code-generator";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import DiffViewer from "./component/text-diff-viewer";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
         grid: {
            width: '100%',
            align: 'right',
            margin: '0 auto',
        },
    }),
);



function App() {
    const [openClippedDrawer, setOpenClippedDrawer] = useState(!isMobile);
    const classes = useStyles();
    const appDrawerLG = openClippedDrawer ? 2 : 1;
    const mainComponentLG = openClippedDrawer ? 9 : 10;
    const appDrawerMD = openClippedDrawer ? 3 : 1;
    const mainComponentMD = openClippedDrawer ? 8 : 10;
    const appDrawerSM = openClippedDrawer ? 4 : 1;
    const mainComponentSM = openClippedDrawer ? 7 : 10;
    const appDrawerXS = openClippedDrawer ? 7 : 1;
    const mainComponentXS = openClippedDrawer ? 4 : 10;

    return (
        <div className="App">
            <Grid container className={classes.grid}>
                <Grid item xs={12}>
                    <AppHeader openClippedDrawer={openClippedDrawer} setOpenClippedDrawer={setOpenClippedDrawer}/>
                </Grid>
                <Grid item xs={12}>
                    <CssBaseline/>
                </Grid>
                <Grid item xs={12}>
                    <div className="App-body">
                        <Switch>
                            <Route path="/base64-encode">
                                <Grid container className={classes.grid}>

                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'base64encode'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>

                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <EncodeDecodeProcessor operation={'base64encode'} label={'Base64 Encode'}/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/base64-decode">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'base64decode'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <EncodeDecodeProcessor operation={'base64decode'} label={'Base64 Decode'}/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/url-encode">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'urlencode'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <EncodeDecodeProcessor operation={'urlencode'} label={'URL Decode'}/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/url-decode">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'urldecode'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <EncodeDecodeProcessor operation={'urldecode'} label={'URL Encode'}/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/jwt-decode">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'jwtdecode'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <EncodeDecodeProcessor operation={'jwtdecode'} label={'JWT Decode'}/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/md5-hash">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'md5hash'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <EncodeDecodeProcessor operation={'md5hash'} label={'MD5 Hash'}/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/sha256-hash">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'sha256hash'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <EncodeDecodeProcessor operation={'sha256hash'} label={'SHA256 Hash'}/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/json-editor">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'jsoneditor'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <JsonEditor/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/qr-code-generator">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'qrcodegenerator'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <QRCodeGenerator/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/diff-viewer">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'diffviewer'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <DiffViewer/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/certificate-decoder">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'certificatedecoder'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <CertificationDecoder/>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/">
                                <Grid container className={classes.grid}>
                                    <Grid item lg={appDrawerLG} md={appDrawerMD} sm={appDrawerSM} xs={appDrawerXS}>
                                        <AppDrawer selectedOperation={'home'} openClippedDrawer={openClippedDrawer}/>
                                    </Grid>
                                    <Grid item lg={mainComponentLG} md={mainComponentMD} sm={mainComponentSM} xs={mainComponentXS}>
                                        <Home/>
                                    </Grid>
                                </Grid>
                            </Route>
                        </Switch>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
