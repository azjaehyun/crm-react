import React, { FC } from 'react';
import { Modal } from 'antd';
interface Props {
    element: any;
    visible: boolean;
    onClose: any;
    onFinish: any;
}
const ChangeNodeModal: FC<Props> = props => {
    console.log(props);

    return (
        <Modal
            className="change-node-modal"
            title="Cofirm"
            visible={props.visible}
            // onOk={onDoneClick}
            onCancel={props.onClose}
        />
    );
};

export default ChangeNodeModal;
