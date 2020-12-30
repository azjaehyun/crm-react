import React, { FC, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';
import CardHeader from '../../TimAdmin/Components/CustomCard/CardHeader';
import { Table } from 'antd';

interface WordCloudData {
    label: string;
    value: number;
}

export type WordCloudDataList = Array<WordCloudData>;

interface Props {
    data: WordCloudDataList;
}

const ComponentWordcloud: FC<Props> = props => {
    return (
        <>
            <div style={{ backgroundColor: '#eee', width: '100%', textAlign: 'center' }}>
                <ReactWordcloud
                    words={props.data.map((d: WordCloudData) => ({ text: d.label, value: d.value }))}
                    options={{
                        rotations: 0,
                        rotationAngles: [0, 90],
                    }}
                    // size={[100,100]}
                />
            </div>
        </>
    );
};

export default ComponentWordcloud;
