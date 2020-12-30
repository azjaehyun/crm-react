import React, { FC, useCallback, useEffect, useState } from 'react';
import biService from '../../service/biService';
import { useDataProvider, useVersion } from 'ra-core';
import Typography from 'antd/es/typography';
import { LoadingOutlined } from '@ant-design/icons/lib';
import { Col, Row, Table } from 'antd';
import ComponentWordcloud, { WordCloudDataList } from './ComponentWordcloud';
import { NONE_SELECTED } from '../SectionsSelect/SectionSelectBot';
import ComponentTable from './ComponentTable';
import CustomCard from '../../TimAdmin/Components/CustomCard/CustomCard';
import CardBody from '../../TimAdmin/Components/CustomCard/CardBody';

const { Title } = Typography;

interface Props {
    botId: string;
}

interface PreWordCloudData {
    label: string;
    value: number;
}

type PreWordCloudDataList = Array<PreWordCloudData>;

interface ResponseData {
    freqEnts: PreWordCloudDataList;
    freqInts: PreWordCloudDataList;
}

const initialResponseData: ResponseData = { freqEnts: [], freqInts: [] };

const SectionRank: FC<Props> = props => {
    const version = useVersion();
    const dataProvider = useDataProvider();
    const { botId } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [responseData, setResponseData] = useState<ResponseData>(initialResponseData);
    const getRank = useCallback(async () => {
        setResponseData((await biService.getTopRank(dataProvider, botId)).data);
        setIsLoading(false);
    }, [dataProvider, botId, setResponseData]);

    useEffect(() => {
        setResponseData(initialResponseData);
        if (props.botId !== NONE_SELECTED) {
            setIsLoading(true);
            getRank();
        }
    }, [version, props.botId, getRank]);

    const content = isLoading ? (
        <LoadingOutlined />
    ) : (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Title level={3}>Entities</Title>
                <ComponentWordcloud data={responseData.freqEnts} />
                <ComponentTable data={responseData.freqEnts} />
            </Col>
            <Col span={12}>
                <Title level={3}>Intents</Title>
                <ComponentWordcloud data={responseData.freqInts} />
                <ComponentTable data={responseData.freqInts} />
            </Col>
        </Row>
    );

    return (
        <>
            <Title level={2}>Rank</Title>
            <CustomCard>
                <CardBody>{content}</CardBody>
            </CustomCard>
        </>
    );
};

export default SectionRank;
