import React, { FC } from 'react';
import { SmartCardEditorProps } from '../types';
import SC001 from '../view/SC001';
import FieldsEditor from '../FieldsEditor';
import PopoverFieldsEditor from '../PopoverFieldsEditor';

const SC001Editor: FC<SmartCardEditorProps> = (props: SmartCardEditorProps) => {
    const editForm = <FieldsEditor scData={props.scData} onChange={scData => props.onChange(scData)} />;
    // console.log('SC001Editor -> init', props);

    return (
        <div className="smart-card-editor-wrapper">
            <div style={{ marginBottom: 20 }}>
                <SC001 data={props.scData} />
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

export default SC001Editor;
