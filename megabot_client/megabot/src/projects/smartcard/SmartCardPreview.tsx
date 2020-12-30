import React, { FC } from 'react';
import smartCardDataHelper, { SC001Data, SC002Data, SC003Data, SC004Data, SC005Data, SC006Data } from './types';
import SC001 from './view/SC001';
import SC005 from './view/SC005';
import SC004 from './view/SC004';
import SC002 from './view/SC002';
import SC003 from './view/SC003';
import { SMART_CARD_CODE } from '../common/Constants';
import SC006 from './view/SC006';

interface Props {
    templateCode: String;
    data?: any;
}

const SmartCardPreview: FC<Props> = (props: any) => {
    if (!props.templateCode || props.templateCode.length === 0) return null;

    let render = <div className="smart-card--no-preview">No Preview</div>;
    const scData = props.data ? props.data : smartCardDataHelper.getPreviewData(props.templateCode);
    // console.log('SmartCardPreview.tsx', props.templateCode, scData);

    switch (props.templateCode) {
        // Basic Card -> done
        case SMART_CARD_CODE.SC001:
            render = <SC001 data={scData as SC001Data} className="preview" />;
            break;
        case SMART_CARD_CODE.SC002:
            render = <SC002 data={scData as SC002Data} />;
            break;

        // Vertical list text -> done
        case SMART_CARD_CODE.SC003:
            render = <SC003 data={scData as SC003Data} onSelected={() => {}} />;
            break;

        // confirm card
        case SMART_CARD_CODE.SC004:
            render = <SC004 data={scData as SC004Data} onSelected={() => {}} />;
            break;

        // Carousel / slider -> done
        case SMART_CARD_CODE.SC005:
            render = (
                <SC005
                    data={scData as SC005Data}
                    selection={true}
                    className={
                        scData.listItem && scData.listItem.values && scData.listItem.values.length > 1 ? '' : 'preview'
                    }
                />
            );
            break;

        // Today weather -> done
        case SMART_CARD_CODE.SC006:
            render = <SC006 data={scData as SC006Data} />;
            break;
    }
    return <div className="smart-card-preview-body">{render}</div>;
};

export default SmartCardPreview;
