import React, {FC, MouseEventHandler} from 'react';
// material-ui
import {makeStyles} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import {SaveOutlined} from "@material-ui/icons";
import {Button, Card} from "antd";
// import {
//     QuestionAnswer as QuestionAnswerIcon,
//     Close as CloseIcon
// } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    footer: {
        // background: indigo[500],
        // color: "white",
        position: "fixed",
        right: "50px",
        zIndex: 4,
        flexWrap: "nowrap",
        alignItems: "center",
        // top: "unset",
        top: "105px",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        borderRadius: "25px",
        textAlign: "center",
    },
    chatButton: {height:"50px" ,fontSize:30, color: "white"}
}));

interface Props {
    onClick: ()=>void;
}

const SectionSaveButton: FC<Props> = (props)=>{
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [buttonColor, setButtonColor] = React.useState<number>(500);

    const open = Boolean(anchorEl);
    const id = open ? 'transitions-popper' : undefined;

    // CustomButton
    return (
        <div
            className={classes.footer}
            aria-describedby={id}
            style={{
                cursor:"pointer",
                // @ts-ignore
                backgroundColor: indigo[buttonColor],
            }}
            onMouseDown={()=>{setButtonColor(300)}}
            onMouseOver={()=>{setButtonColor(400)}}
            onMouseLeave={()=>{setButtonColor(500)}}
            onClick={(event) => {
                props.onClick()
                setAnchorEl(anchorEl ? null : event.currentTarget);
                setTimeout(()=>{
                    setButtonColor(500)
                }, 200)
            }}
        >
            <SaveOutlined className={classes.chatButton}/>
            {/*{open*/}
            {/*    ? <CloseIcon className={classes.chatButton}/>*/}
            {/*    : <QuestionAnswerIcon className={classes.chatButton}/>*/}
            {/*}*/}
        </div>
    );
}
export default SectionSaveButton;
