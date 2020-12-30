import React, { FC } from 'react';
import { Legend, Pie, PieChart } from 'recharts';
import { CONTENTS_WIDTH } from '../../Static';

interface ChartElement {
    name: string;
    value: number;
}

interface Props {
    chartData: Array<ChartElement>;
}

const ComponentPieChart: FC<Props> = props => {
    const defaultValue = [
        {
            name: 'Group A',
            value: 2400,
        },
        {
            name: 'Group B',
            value: 4567,
        },
        {
            name: 'Group C',
            value: 1398,
        },
        {
            name: 'Group D',
            value: 9800,
        },
        {
            name: 'Group E',
            value: 3908,
        },
        {
            name: 'Group F',
            value: 4800,
        },
    ];
    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <PieChart width={CONTENTS_WIDTH / 2} height={CONTENTS_WIDTH / 4}>
                <Pie data={props.chartData} nameKey={'name'} dataKey={'value'} label fill={'#aaf'} />
                <Legend />
                {/*<Pie data={defaultValue} nameKey={'name'} dataKey={'value'} label/>*/}
            </PieChart>
        </div>
    );
};

export default ComponentPieChart;
