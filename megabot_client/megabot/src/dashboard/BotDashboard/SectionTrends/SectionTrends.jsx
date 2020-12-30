import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useDataProvider, useVersion } from 'ra-core';
import biService from '../../service/biService';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import ComponentChart from './ComponentChart';
import Title from 'antd/es/typography/Title';
import { Button, Col, Dropdown, Menu, Row } from 'antd';
import CustomCard from '../../TimAdmin/Components/CustomCard/CustomCard';
import CardBody from '../../TimAdmin/Components/CustomCard/CardBody';
import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined';

const SectionTrends = props => {
    const DATA_KEYS = {
        USER: 'user',
        Conversations: 'conversation',
        Messages: 'message',
    };

    const version = useVersion();
    const dataProvider = useDataProvider();

    const [trendsType, setTrendsType] = useState('DAY');

    const [trends, setTrends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getTrends = useCallback(async () => {
        setTrends(await biService.getTrendsParams(dataProvider, props.botId, new Date(), trendsType));
    }, [dataProvider, setTrends, props, trendsType]);

    useEffect(() => {
        setIsLoading(true);
        getTrends();
    }, [version, props.botId, getTrends, trendsType]);

    useEffect(() => {
        if (trends !== []) {
            setIsLoading(false);
        }
    }, [trends]);

    const content =
        isLoading || trends.length === 0 ? (
            <LoadingOutlined />
        ) : (
            <Row style={{ width: 1140 }}>
                <Col>
                    <Title level={3}>Message</Title>
                    <ComponentChart data={trends} dataKey={DATA_KEYS.Messages} />
                </Col>
                <Col>
                    <Title level={3}>Conversation</Title>
                    <ComponentChart data={trends} dataKey={DATA_KEYS.Conversations} />
                </Col>
                <Col>
                    <Title level={3}>User</Title>
                    <ComponentChart data={trends} dataKey={DATA_KEYS.USER} />
                </Col>
            </Row>
        );

    return (
        <>
            <Title level={2}>trends</Title>
            <CustomCard>
                <CardBody>
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item
                                        onClick={() => {
                                            setTrendsType('HOUR');
                                        }}
                                        key={'HOUR'}
                                    >
                                        Hour
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            setTrendsType('DAY');
                                        }}
                                        key={'DAY'}
                                    >
                                        Day
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            setTrendsType('MONTH');
                                        }}
                                        key={'MONTH'}
                                    >
                                        Month
                                    </Menu.Item>
                                </Menu>
                            }
                        >
                            <Button style={{ width: 100 }}>
                                <span style={{ width: 65, textAlign: 'left' }}>{trendsType}</span>
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                    {content}
                </CardBody>
            </CustomCard>
        </>
    );
};

export default SectionTrends;
