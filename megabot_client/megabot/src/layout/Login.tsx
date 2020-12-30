import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, withTypes } from 'react-final-form';
import { useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import './css/Login.css';

import { Notification } from 'react-admin';
import { useTranslate, useLogin, useNotify } from 'ra-core';
import { lightTheme } from './themes';
import AiMainLogo from '../img/ai_main.jpg';

const useStyles = makeStyles(theme => ({
    main: {
        // display: 'flex',
        // flexDirection: 'column',
        // minHeight: '100vh',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        // background: `url(${AiMainLogo})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        // marginTop: '20em',
        // marginRight: '100em',
        // color: 'white',
        // /* background: 'rgba(0, 0, 0, 0.2)', */
        background: 'none',
        // border: 'none',
        // opacity: '0.9',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
        inputWebkitAutofill: {
            webkitTextFillColor: 'yellow !important',
        },
    },

    actions: {
        padding: '0 1em 1em 1em',
    },
}));

const containerStyle = {
    /* input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-transition: background-color 9999s ease-out;
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: #fff !important;
     } */
};

// input:-internal-autofill-selected {
//     -webkit-appearance: menulist-button;
//     background-color: rgb(232, 240, 254) !important;
//     background-image: none !important;
//     color: -internal-light-dark-color(black, white) !important;
// }

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => <TextField error={!!(touched && error)} helperText={touched && error} {...inputProps} {...props} fullWidth />;

interface FormValues {
    username?: string;
    password?: string;
}

const { Form } = withTypes<FormValues>();

const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const classes = useStyles();
    const notify = useNotify();
    const login = useLogin();
    const location = useLocation<{ nextPathname: string } | null>();

    const handleSubmit = (auth: FormValues) => {
        setLoading(true);

        // TODO after transferProject
        // login(auth, '/transferProject').catch(
        login(auth, '/project/dashboard').catch(
            //login(auth, location.state ? location.state.nextPathname : '/transferProject').catch(
            (error: Error) => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                    'warning'
                );
            }
        );
    };

    const validate = (values: FormValues) => {
        const errors: FormValues = {};
        if (!values.username) {
            errors.username = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.main}>
                        <Card className={classes.card}>
                            <div className={classes.avatar}>
                                <Avatar className={classes.icon}>
                                    <LockIcon />
                                </Avatar>
                            </div>
                            <div className={classes.hint}>Hint: admin / admin</div>
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        name="username"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={translate('ra.auth.username')}
                                        disabled={loading}
                                        placeholder="Username"
                                    />
                                </div>
                                <div className={classes.input}>
                                    <Field
                                        name="password"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={translate('ra.auth.password')}
                                        type="password"
                                        disabled={loading}
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <CardActions className={classes.actions}>
                                <Button variant="contained" type="submit" color="primary" disabled={loading} fullWidth>
                                    {loading && <CircularProgress size={25} thickness={2} />}
                                    {translate('ra.auth.sign_in')}
                                </Button>
                            </CardActions>
                        </Card>
                        <Notification />
                    </div>
                </form>
            )}
        />
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hooks used in Login won't get
// the right theme
const LoginWithTheme = (props: any) => (
    // <ThemeProvider theme={createMuiTheme(lightTheme)}>
    //     <Login {...props} />
    // </ThemeProvider>
    <div
        style={{
            backgroundColor: 'black',
            height: '100vh',
            textAlign: 'left',
            background: `url(${AiMainLogo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}
    >
        <span
            style={{
                display: 'inline-block',
                height: '50%',
            }}
        />
        <span
            style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginLeft: '10vw',
            }}
        >
            <Login {...props} />
        </span>
    </div>
);

export default LoginWithTheme;
