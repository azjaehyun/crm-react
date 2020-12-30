import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import Circle from 'antd/es/progress/Circle';

export default memo(({ data }) => {
    return (
        <>
            <Handle
                type="source"
                position="right"
                style={{ background: '#fff' }}
                onConnect={params => console.log('handle onConnect', params)}
            />
            {/*<div>*/}
            {/*    Custom Color Picker Node: <strong>{data.color}</strong>*/}
            {/*</div>*/}
            <Circle prefixCls={'saaaa'} progressStatus={'Aaaaaa'}>
                {data.name}
            </Circle>
            {/*<input className="nodrag" type="color" onChange={data.onChange} defaultValue={data.color} />*/}
            {/*<Handle type="source" position="right" id="a" style={{ top: 10, background: '#fff' }} />*/}
            {/*<Handle type="source" position="right" id="b" style={{ bottom: 10, top: 'auto', background: '#fff' }} />*/}
        </>
    );
});
