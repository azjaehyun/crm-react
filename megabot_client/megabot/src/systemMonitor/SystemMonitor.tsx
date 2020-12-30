import React, { FC, Fragment } from 'react';
import './scss/SystemMonitor.scss';
import SystemLogs from './component/SystemLogs';
import ServersStatus from './component/ServersStatus';

const SystemMonitor: FC = () => {
    return (
        <Fragment>
            <div style={{ margin: '50px 50px 50px 50px' }}>
                <ServersStatus />
            </div>
            <div style={{ margin: '16px 50px 50px 50px' }}>
                <SystemLogs />
            </div>
        </Fragment>
    );
};

export default SystemMonitor;
