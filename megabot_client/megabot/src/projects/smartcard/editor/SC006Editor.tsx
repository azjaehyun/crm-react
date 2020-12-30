import React, { FC } from 'react';
import { SmartCardEditorProps } from '../types';
import SC006 from '../view/SC006';
import FieldsEditor from '../FieldsEditor';
import PopoverFieldsEditor from '../PopoverFieldsEditor';

/**
 * Today weather
 * @param props
 * @constructor
 */
const SC006Editor: FC<SmartCardEditorProps> = (props: SmartCardEditorProps) => {
    const fieldForm = <FieldsEditor scData={props.scData} onChange={scData => props.onChange(scData)} />;
    // console.log('SC006Editor -> init', props);

    if (!props.scData || !props.scData.textItem) return null;
    return (
        <div className="smart-card-editor-wrapper">
            <div style={{ marginBottom: 20 }}>
                <SC006 data={props.scData} />
            </div>
            {!props.inlineEdit && (
                <div className="smart-card-editor--action-area">
                    <PopoverFieldsEditor scData={props.scData} onChange={scData => props.onChange(scData)} />
                </div>
            )}
            {props.inlineEdit && fieldForm}
        </div>
    );
};

export default SC006Editor;
