import React, { FC, useState } from 'react';
import { Button, Space, Tooltip } from 'antd';

import { LockOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useTranslate } from 'react-admin';
import TestZone from './testzone/TestZone';
import Moment from 'react-moment';
import { BOT_LANGUAGES, BotPrivateColor, BotPublicColor, PrimaryColor } from './common/Constants';
import { IconText } from './common/IconText';
import { UnlockOutlined } from '@ant-design/icons/lib';

const { Paragraph, Text } = Typography;
interface Prods {
    bot: any;
}

const ProjectInfoHeader: FC<Prods> = prods => {
    const translate = useTranslate();
    const [visibleTestZone, setVisibleTestZone] = useState(false);

    return (
        <>
            <div className="detail-header">
                <span style={{ fontSize: 18, color: PrimaryColor }}>{prods.bot.name}</span>
                {/*<Button*/}
                {/*    type="primary"*/}
                {/*    ghost*/}
                {/*    style={{ float: 'right', width: 80 }}*/}
                {/*    onClick={() => setVisibleTestZone(true)}*/}
                {/*>*/}
                {/*    {translate(`common.button.try_it`)}*/}
                {/*</Button>*/}
                <Paragraph
                    style={{ paddingRight: 150 }}
                    ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: translate('common.label.more'),
                    }}
                >
                    {prods.bot.description ? prods.bot.description : translate(`common.label.no_description`)}
                </Paragraph>
                <Space size="large" style={{ fontSize: 12 }}>
                    <IconText icon={<UserOutlined />} text={prods.bot.botOwner.username} />
                    <IconText
                        icon={<Text style={{ color: '#000' }}>{BOT_LANGUAGES[prods.bot.language].icon}</Text>}
                        text={BOT_LANGUAGES[prods.bot.language].name}
                    />
                    <span>
                        {translate('common.label.created_on')}{' '}
                        <Moment fromNow withTitle={true} locale={prods.bot.language}>
                            {prods.bot.createdOn}
                        </Moment>
                    </span>
                    <span>
                        {translate('common.label.updated_on')}{' '}
                        <Moment fromNow withTitle={true} locale={prods.bot.language}>
                            {prods.bot.updatedOn}
                        </Moment>
                    </span>
                    {prods.bot.private ? (
                        <IconText
                            icon={<LockOutlined style={{ color: BotPrivateColor }} />}
                            text={translate(`common.label.private`)}
                        />
                    ) : (
                        <IconText
                            icon={<UnlockOutlined style={{ color: BotPublicColor }} />}
                            text={translate(`common.label.public`)}
                        />
                    )}
                </Space>
            </div>

            <MessageOutlined
                onClick={() => setVisibleTestZone(true)}
                style={{
                    position: 'fixed',
                    bottom: 15,
                    right: 15,
                    fontSize: 24,
                    backgroundColor: '#1890FF',
                    padding: 14,
                    borderRadius: '50%',
                    color: '#FFF',
                    cursor: 'pointer',
                    zIndex: 10,
                }}
            />
            <TestZone bot={prods.bot} visible={visibleTestZone} onClose={() => setVisibleTestZone(false)} />
        </>
    );
};

export default ProjectInfoHeader;
