import React, { FC } from 'react';
import { Col, Divider, Row, Table } from 'antd';
import CustomCard from '../TimAdmin/Components/CustomCard/CustomCard';
import CardHeader from '../TimAdmin/Components/CustomCard/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../TimAdmin/asset/jss/material-dashboard-react/views/dashboardStyle';
import Title from 'antd/es/typography/Title';
import CardBody from '../TimAdmin/Components/CustomCard/CardBody';
import CustomTable from '../TimAdmin/Components/CustomTable/CustomTable';
import SectionSimpleCardList from './SectionSimpleCardList';

// @ts-ignore
const useStyles = makeStyles(styles);

interface Props {}

const GlobalDashboard: FC<Props> = props => {
    const classes = useStyles();
    const dummyData = [
        {
            key: 1,
            botName: 'QuAC',
            img: 'https://ai.mz.co.kr:8443/wp-contents/bot/thumbnail/0daf71a2c1ce41efbc5422e35fd278aa/question.png',
            Intents: 1832,
            Entities: 3992,
        },
        {
            key: 2,
            botName: 'Booking',
            img: '/icon/SingleBot.png',
            Intents: 138,
            Entities: 1823,
        },
        {
            key: 3,
            botName: 'Flight-Searching',
            img: 'https://ai.mz.co.kr:8443/wp-contents/bot/thumbnail/a83e4e4529544961bf5412533c8e33f3/airplane2.png',
            Intents: 121,
            Entities: 842,
        },
        {
            key: 4,
            botName: 'BG-01',
            img:
                'https://ai.mz.co.kr:8443/wp-contents/bot/thumbnail/a24ebb0910f446ac801a5f62976c6c13/anh-dai-dien-dep.jpg',
            Intents: 98,
            Entities: 799,
        },
        {
            key: 5,
            botName: 'BOOK_MEETING_ROOM',
            img: '/icon/SingleBot.png',
            Intents: 47,
            Entities: 490,
        },
    ];
    return (
        <>
            <div style={{ padding: 10, marginBottom: 5, marginTop: 5 }}>
                <Title level={2}>Global</Title>
                <SectionSimpleCardList />
                {/*<Title level={2}>Project Overview</Title>*/}
                <CustomCard>
                    {/*<CardHeader>*/}
                    {/*</CardHeader>*/}
                    <CardBody>
                        <Table
                            dataSource={dummyData}
                            columns={[
                                {
                                    title: '',
                                    width: 50,
                                    dataIndex: 'img',
                                    render: imageUrl => (
                                        <div>
                                            <img width={25} height={25} src={imageUrl} />
                                        </div>
                                    ),
                                },
                                { title: 'No.', width: 50, dataIndex: 'key' },
                                { title: 'BotName', dataIndex: 'botName' },
                                { title: 'Intents', dataIndex: 'Intents' },
                                { title: 'Entities', dataIndex: 'Entities' },
                            ]}
                        />
                    </CardBody>
                </CustomCard>
                {/*<CustomCard>*/}
                {/*    <CardHeader color="warning">*/}
                {/*        <h4 className={classes.cardTitleWhite}>Project Rank</h4>*/}
                {/*        /!*<p className={classes.cardCategoryWhite}>*!/*/}
                {/*        /!*    New employees on 15th September, 2016*!/*/}
                {/*        /!*</p>*!/*/}
                {/*    </CardHeader>*/}
                {/*    <CardBody>*/}
                {/*        <CustomTable*/}
                {/*            tableHeaderColor="warning"*/}
                {/*            tableHead={['Rank', 'Project Name', 'Intents', 'Entities']}*/}
                {/*            tableData={[*/}
                {/*                ['1', 'E-Commerce', '1832', '3992'],*/}
                {/*                ['2', 'Recommend', '138', '1823'],*/}
                {/*                ['3', 'Reservation', '121', '842'],*/}
                {/*                ['4', 'Guide', '98', '799'],*/}
                {/*                ['5', 'Accounting', '47', '490'],*/}
                {/*            ]}*/}
                {/*        />*/}

                {/*    </CardBody>*/}
                {/*</CustomCard>*/}
            </div>
            <Divider />
        </>
    );
};

export default GlobalDashboard;
