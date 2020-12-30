import React from 'react';
import { Col, Row } from 'antd';
import CustomCard from '../TimAdmin/Components/CustomCard/CustomCard';
import CardHeader from '../TimAdmin/Components/CustomCard/CardHeader';
import CardIcon from '../TimAdmin/Components/CustomCard/CardIcon';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import CardBody from '../TimAdmin/Components/CustomCard/CardBody';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Title from 'antd/es/typography/Title';

const SectionSimpleCardList = () => {
    const cardList = [
        {
            name: 'Bots',
            img: <InsertEmoticonIcon style={{ color: '#000000' }} />,
            count: 38,
        },
        {
            name: 'Intents',
            img: <GpsFixedIcon style={{ color: '#000000' }} />,
            count: 182,
        },
        {
            name: 'Entities',
            img: <LocalOfferIcon style={{ color: '#000000' }} />,
            count: 321,
        },
    ];
    const customCard = (card: any) => {
        const { name, img, count, color } = card;
        return (
            <CustomCard>
                {/*<CardHeader stats icon>*/}
                {/*    <CardIcon color={'rose'}>*/}
                {/*        {img}*/}
                {/*    </CardIcon>*/}
                {/*</CardHeader>*/}
                <CardBody>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Title>
                            {img} {count}
                        </Title>
                        <Title level={4}>{name}</Title>
                    </div>
                </CardBody>
            </CustomCard>
        );
    };
    return (
        <Row gutter={10}>
            {cardList.map(card => (
                <Col key={card.name} span={8}>
                    {customCard(card)}
                </Col>
            ))}
        </Row>
    );
};

export default SectionSimpleCardList;
