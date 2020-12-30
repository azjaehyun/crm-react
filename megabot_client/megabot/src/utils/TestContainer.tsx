import React, { FC } from 'react';

interface Props {
    value: string;
}

const TestContainer: FC<Props> = ({ value }) => {
    const style = { height: '100%', widht: '100%', backgroundColor: 'yellow' };
    return (
        <div style={style} hidden={true}>
            {value}
        </div>
    );
};

export default TestContainer;
