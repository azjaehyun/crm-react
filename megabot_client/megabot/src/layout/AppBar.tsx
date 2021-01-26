import React, { forwardRef, useState } from 'react';
import { AppBar, UserMenu, MenuItemLink, useTranslate, useLocale } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import './scss/AppBar.scss';
import Manual from '../help/Manual';
import { Button, Modal } from 'antd';
import Configuration from '../configuration/Configuration';

const CustomAppBar = (props: any) => {
    const [visible, setVisible] = useState(false);
    const [visibleConfig, setVisibleConfig] = useState(false);
    const [language, setLanguage] = useState('');
    const locale = useLocale();
    const translate = useTranslate();

    const openModal = () => {
        setLanguage(locale);
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    };

    const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
        const onOpen = () => {
            setVisibleConfig(true);
        };

        return (
            <div>
                {/*<MenuItemLink*/}
                {/*    ref={ref}*/}
                {/*    to="/configuration"*/}
                {/*    primaryText={translate('pos.configuration')}*/}
                {/*    leftIcon={<SettingsIcon />}*/}
                {/*    onClick={props.onClick}*/}
                {/*/>*/}
                <li
                    className="MuiButtonBase-root MuiListItem-root MuiMenuItem-root logout RaLogout-menuItem-191 MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button"
                    role="menuitem"
                    aria-disabled="false"
                    onClick={onOpen}
                    style={{ color: '#8a959f' }}
                >
                    <SettingsIcon style={{ marginRight: 20 }} />
                    {translate('pos.configuration')}
                </li>
            </div>
        );
    });

    const CustomUserMenu = (props: any) => (
        <UserMenu {...props}>
            <ConfigurationMenu />
        </UserMenu>
    );

    const closeDraw = () => {
        setVisibleConfig(false);
    };

    return (
        <AppBar {...props} userMenu={<CustomUserMenu />}>
            <Typography variant="h6" color="inherit" className="appbar-title" id="react-admin-title">
                <div
                    style={{
                        fontSize: '25px',
                        fontFamily: 'Roboto',
                        marginLeft: -20,
                        marginTop: -17,
                        marginBottom: -9,
                        height: '80%',
                    }}
                >
                    <img src={require('./asset/logo.svg')} />
                </div>
            </Typography>

            <span style={{ flex: 1 }} />

            <HelpOutlineIcon style={{ marginRight: 10, color: '#FFF' }} onClick={openModal} />
            <Modal
                title="Help"
                width={700}
                visible={visible}
                onCancel={closeModal}
                style={{ float: 'right', right: 20 }}
                bodyStyle={{ height: 500, overflowY: 'auto' }}
                mask={false}
                maskClosable={false}
                footer={null}
            >
                <Manual language={language} />
            </Modal>
            <Configuration visible={visibleConfig} onClose={closeDraw} />
        </AppBar>
    );
};

export default CustomAppBar;
