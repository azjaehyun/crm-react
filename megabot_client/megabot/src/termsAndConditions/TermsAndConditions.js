import React from 'react';
import Card from '@material-ui/core/Card';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate, Title } from 'react-admin';

const useStyles = makeStyles({
    root: {
        marginTop: 16,
    },
});

const TermsAndConditions = () => {
    const translate = useTranslate();
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Title title={translate('resources.termsandconditions.name')} />
            <div>termsandconditions 여기다가 개발하세용~</div>
        </Card>
    );
};

export default TermsAndConditions;
