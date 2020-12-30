import React, { FC } from 'react';
import Slider from '@ant-design/react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SC001 from './SC001';
import smartCardDataHelper, { SC001Data, SC005Data } from '../types';
import { SMART_CARD_CODE } from '../../common/Constants';

interface Prods {
    data: SC005Data;
    selection?: Boolean;
    onSelected?: Function;
    className?: String;
}

/**
 * Carousel / slider
 * @param prods
 * @constructor
 */
const SC005: FC<Prods> = (prods: Prods) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const sc001DataList = prods.data
        ? smartCardDataHelper.convertListItemDataToListOfTextItemData(prods.data, SMART_CARD_CODE.SC001)
        : [];

    // console.log('SC005.tsx', prods);
    // console.log('SC005.tsx', sc001DataList);

    return (
        <div className={`sc005 ${prods.className ? prods.className : ''}`}>
            <Slider {...settings}>
                {sc001DataList.map((scData: any, index: number) => (
                    <SC001
                        key={index}
                        data={scData}
                        selection={prods.selection}
                        onSelected={(postBackValue: any) => {
                            if (prods.onSelected) prods.onSelected(postBackValue);
                        }}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default SC005;
