import React, { FC, useEffect, useRef, useState, Fragment } from 'react';
import { Button, Input, Popconfirm, Popover, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, EnterOutlined } from '@ant-design/icons/lib';
import FieldsEditor from './FieldsEditor';
import { SmartCardData } from './types';
import { useTranslate } from 'ra-core';

const { Text } = Typography;

interface Props {
    scData: SmartCardData;
    onChange(scData: SmartCardData): any;
    onDeleteClick?: any;
}

const PopoverFieldsEditor: FC<Props> = (props: Props) => {
    const translate = useTranslate();
    const PopoverContent = (
        // <Scrollbars autoHide autoHideTimeout={300} autoHideDuration={100}>
        <FieldsEditor scData={props.scData} onChange={scData => props.onChange(scData)} />
        // </Scrollbars>
    );

    // console.log('PopoverFieldsEditor', props);

    return (
        <Fragment>
            <Popover
                content={PopoverContent}
                title="Edit Card"
                trigger="click"
                placement="leftTop"
                overlayClassName="mz-popover-smartcard-edit"
                destroyTooltipOnHide={true}
            >
                <EditOutlined className="mz-icon-btn" />
            </Popover>
            {props.onDeleteClick && (
                <Popconfirm
                    placement="right"
                    title={'Do you want delete this item?'}
                    onConfirm={() => props.onDeleteClick()}
                    okText={translate(`common.button.yes`)}
                    cancelText={translate(`common.button.no`)}
                >
                    <DeleteOutlined className="mz-icon-btn trash-btn" />
                </Popconfirm>
            )}
        </Fragment>
    );
};

export default PopoverFieldsEditor;
