import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { MessageOutlined, getTwoToneColor, setTwoToneColor, FallOutlined } from '@ant-design/icons';
setTwoToneColor('#eb2f96');
getTwoToneColor(); // #eb2f96

const useStyles = makeStyles({
    root: {
        marginTop: 16,
    },
});

const TransferProject = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <MessageOutlined style={{ fontSize: '160px', color: '#08c' }} />
            <FallOutlined />
        </Card>
    );
};

export default TransferProject;
