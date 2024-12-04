import React from "react";
// import the react-json-view component
import { JsonEditor as Editor } from "jsoneditor-react";
//import "jsoneditor-react/es/editor.min.css";
import Ajv from "ajv";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/github";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import "./json-editor.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
    },
    button: {
      align: "center",
      margin: "5px",
    },
    title: {
      flexGrow: 1,
      textAlign: "left",
      color: "black",
    },
  })
);

export default function JsonEditor(props) {
  const classes = useStyles();

  const ajv = new Ajv({ allErrors: true, verbose: true });

  return (
    <div className={classes.root}>
      <br />
      <Editor
        name={"root"}
        value={props.value ? props.value : { key: "value" }}
        mode={props.mode ? props.mode : "text"}
        search={true}
        history={true}
        statusBar={true}
        navigationBar={true}
        allowedModes={
          props.allowedModes ? props.allowedModes : ["text", "view", "tree"]
        }
        ace={ace}
        theme="/ace/theme/github"
        ajv={ajv}
      />
    </div>
  );
}
