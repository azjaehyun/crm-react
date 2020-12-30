import React, { FC } from 'react';
import { SmartCardEditorProps } from './types';
import { SMART_CARD_CODE } from '../common/Constants';
import SC003Editor from './editor/SC003Editor';
import SC006Editor from './editor/SC006Editor';
import SC001Editor from './editor/SC001Editor';
import SC005Editor from './editor/SC005Editor';
import SC004Editor from './editor/SC004Editor';

const SmartCardEditor: FC<SmartCardEditorProps> = (props: any) => {
    // console.log('SmartCardEditor', props);
    if (props.templateCode) {
        switch (props.templateCode) {
            case SMART_CARD_CODE.SC001:
                return <SC001Editor {...props} />;
            case SMART_CARD_CODE.SC003:
                return <SC003Editor {...props} />;
            case SMART_CARD_CODE.SC004:
                return <SC004Editor {...props} />;
            case SMART_CARD_CODE.SC005:
                return <SC005Editor {...props} />;
            case SMART_CARD_CODE.SC006:
                return <SC006Editor {...props} />;
        }
    }
    return <div className="smart-card--no-preview">Please select a smart card !!!</div>;
};

export default SmartCardEditor;
