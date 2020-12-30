import React, { FC, useState, Fragment } from 'react';
import { CommentOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';

const TalkBotBtn: FC = () => {
    const [visible, setVisible] = useState(false);

    const onClick = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <Fragment>
            <div
                className="talkbot-btn"
                style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                    backgroundColor: '#1890FF',
                    borderRadius: '50%',
                    padding: '12px',
                    cursor: 'pointer',
                }}
                onClick={onClick}
            >
                <CommentOutlined
                    style={{
                        fontSize: '22px',
                        color: '#FFF',
                    }}
                />
            </div>
            <Drawer title="TalkBot Name" placement="right" width="500px" onClose={onClose} visible={visible} />
        </Fragment>
    );
};

export default TalkBotBtn;
