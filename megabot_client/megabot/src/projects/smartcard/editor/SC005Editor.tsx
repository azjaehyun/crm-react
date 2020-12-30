import React, { FC } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import smartCardDataHelper, { SC001_DUMMY_DATA, SC001Data, SmartCardEditorProps } from '../types';
import FieldsEditor from '../FieldsEditor';
import PopoverFieldsEditor from '../PopoverFieldsEditor';
import { SMART_CARD_CODE } from '../../common/Constants';
import SC005 from '../view/SC005';

/**
 * Carousel / slider
 * @param props
 * @constructor
 */
const SC005Editor: FC<SmartCardEditorProps> = (props: SmartCardEditorProps) => {
    const editForm = <FieldsEditor scData={props.scData} onChange={scData => props.onChange(scData)} />;

    const getPreviewData = () => {
        let sc001Data: SC001Data = {
            templateCode: SMART_CARD_CODE.SC001,
            textItem: smartCardDataHelper.convertValuesToFieldList(
                props.scData.listItem ? props.scData.listItem.values[0] : []
            ),
        };

        if (!sc001Data) return SC001_DUMMY_DATA;
        return sc001Data as SC001Data;
    };

    if (!props.scData) return null;

    return (
        <div className="smart-card-editor-wrapper">
            <div style={{ marginBottom: 20 }}>
                <SC005
                    data={props.scData}
                    selection={true}
                    className={
                        props.scData.listItem && props.scData.listItem.values && props.scData.listItem.values.length > 1
                            ? ''
                            : 'preview'
                    }
                />
            </div>
            {!props.inlineEdit && (
                <div className="smart-card-editor--action-area">
                    <PopoverFieldsEditor scData={props.scData} onChange={scData => props.onChange(scData)} />
                </div>
            )}
            {props.inlineEdit && editForm}
        </div>
    );
};

export default SC005Editor;
