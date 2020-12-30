import React, { FC } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { CONTENTS_WIDTH } from '../../Static';

interface Props {
    data: ReadonlyArray<object>;
    dataKey: string;
}

const ComponentChart: FC<Props> = props => {
    return (
        <AreaChart height={200} width={CONTENTS_WIDTH / 3} data={props.data}>
            <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <Area type={'monotone'} stroke={'#8884d8'} dataKey={props.dataKey} fillOpacity={1} fill={'url(#color)'} />
            <XAxis dataKey={'name'} />
            <YAxis />
            {/*<Legend/>*/}
            {/*<CartesianGrid strokeDasharray="3 3"/>*/}
            <Tooltip />
        </AreaChart>
    );
};

export default ComponentChart;
