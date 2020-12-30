import React, { FC } from 'react';
import { Card, Typography } from 'antd';
import { useTranslate } from 'react-admin';

const { Paragraph } = Typography;

const BackupRestore: FC = () => {
    const translate = useTranslate();

    return (
        <div className="backup-container">
            <Card className="backup-content" bordered={false}>
                <p className="backup-title">{translate(`resources.projects.bot_summary.backup.title`)}</p>
                <Paragraph>{translate(`resources.projects.bot_summary.backup.description`)}</Paragraph>
            </Card>
            <Card className="restore-content" bordered={false}>
                <p className="restore-title">{translate(`resources.projects.bot_summary.restore.title`)}</p>
                <Paragraph>{translate(`resources.projects.bot_summary.restore.description`)}</Paragraph>
            </Card>
        </div>
    );
};

export default BackupRestore;
