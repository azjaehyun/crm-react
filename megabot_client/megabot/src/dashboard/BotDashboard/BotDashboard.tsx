import React, { FC, useState } from 'react';
import TestContainer from '../../utils/TestContainer';
import CustomCard from '../TimAdmin/Components/CustomCard/CustomCard';
import { Col, Row } from 'antd';
import SectionSelectBot from './SectionsSelect/SectionSelectBot';
import Typography from 'antd/es/typography';
import CardBody from '../TimAdmin/Components/CustomCard/CardBody';
import SectionTrends from './SectionTrends/SectionTrends';
import SectionRank from './SectionRank/SectionRank';
import SectionUsage from './SectionUsage/SectionUsage';

const { Title } = Typography;

interface Props {}

const BotDashboard: FC<Props> = props => {
    const [selectedBotId, setSelectedBotId] = useState<string>('534485f1b600404f9e297af9dcd0c764');
    return (
        <>
            <Row>
                <Col xs={4}>
                    <Title level={2}>Bot</Title>
                </Col>
                <Col xs={20}>
                    <SectionSelectBot selected={selectedBotId} setSelected={setSelectedBotId} />
                </Col>
            </Row>
            <CustomCard style={{ padding: 10, marginTop: 5, minHeight: 400 }}>
                <CardBody>
                    <TestContainer value={selectedBotId} />
                    <div style={{ textAlign: 'right' }}>Bot_ID: {selectedBotId}</div>
                    <SectionTrends botId={selectedBotId} />
                    <SectionRank botId={selectedBotId} />
                    <SectionUsage botId={selectedBotId} />
                </CardBody>
            </CustomCard>
        </>
    );
};

export default BotDashboard;
