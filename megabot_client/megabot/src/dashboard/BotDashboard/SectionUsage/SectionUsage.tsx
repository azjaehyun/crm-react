import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDataProvider, useVersion } from 'ra-core';
import biService from '../../service/biService';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import Title from 'antd/es/typography/Title';
import { Col, Row } from 'antd';
import ComponentPieChart from './ComponentPieChart';
import CustomCard from '../../TimAdmin/Components/CustomCard/CustomCard';
import CardBody from '../../TimAdmin/Components/CustomCard/CardBody';

interface Props {
    botId: string;
}

const SectionUsage: FC<Props> = props => {
    const version = useVersion();
    const dataProvider = useDataProvider();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [responseData, setResponseData] = useState({ user: [], conversation: [] });
    const getUsage = useCallback(async () => {
        setResponseData({
            user: await biService.getRatioChannelUsage(dataProvider, props.botId, 'NUMBER_OF_USER'),
            conversation: await biService.getRatioChannelUsage(dataProvider, props.botId, 'NUMBER_OF_CONVERSATION'),
        });
        setIsLoading(false);
    }, [dataProvider, props.botId, setResponseData, setIsLoading]);
    useEffect(() => {
        setIsLoading(true);
        getUsage();
    }, [version, props.botId, getUsage]);

    const content = isLoading ? (
        <LoadingOutlined />
    ) : (
        <Row>
            <Col span={12}>
                <Title level={4}>User</Title>
                <ComponentPieChart chartData={responseData.user} />
                {JSON.stringify(responseData.user)}
            </Col>
            <Col span={12}>
                <Title level={4}>Conversation</Title>
                <ComponentPieChart chartData={responseData.conversation} />
                {JSON.stringify(responseData.conversation)}
            </Col>
        </Row>
    );

    return (
        <>
            <Title level={2}>Channel</Title>
            <CustomCard>
                <CardBody>{content}</CardBody>
            </CustomCard>
        </>
    );
};

export default SectionUsage;
