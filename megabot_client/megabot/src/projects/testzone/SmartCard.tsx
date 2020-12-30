import React, { FC, Fragment, useEffect, useState } from 'react';
import { SMART_CARD_CODE } from '../common/Constants';
import SC003 from '../smartcard/view/SC003';
import SC004 from '../smartcard/view/SC004';
import SC001 from '../smartcard/view/SC001';
import SC002 from '../smartcard/view/SC002';
import SC006 from '../smartcard/view/SC006';
import SC005 from '../smartcard/view/SC005';

import { Typography } from 'antd';
const { Text } = Typography;

interface Prods {
    templateCode: any;
    data: any;
    onSelected?: any;
}

const SmartCard: FC<Prods> = (prods: any) => {
    let render = null;
    switch (prods.templateCode) {
        case SMART_CARD_CODE.SC001:
            render = <SC001 data={prods.data} selection={false} className="sm-250" />;
            break;
        case SMART_CARD_CODE.SC002:
            render = <SC002 data={prods.data} />;
            break;
        case SMART_CARD_CODE.SC003:
            render = <SC003 data={prods.data} onSelected={prods.onSelected} className="sm-250" />;
            break;
        case SMART_CARD_CODE.SC004:
            render = <SC004 data={prods.data} onSelected={prods.onSelected} className="sm-250" />;
            break;
        case SMART_CARD_CODE.SC005:
            render = <SC005 data={prods.data} onSelected={prods.onSelected} selection={true} className="sm-250" />;
            break;
        case SMART_CARD_CODE.SC006:
            render = <SC006 data={prods.data} />;
            break;
    }

    return (
        <div className="smart-card-wrapper">
            {render} {prods.children}
        </div>
    );
};

export default SmartCard;
