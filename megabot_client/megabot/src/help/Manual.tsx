import React, { FC } from 'react';
import { koreanManual } from './koreanManual';
import { englishManual } from './englishManual';

interface Prods {
    language: string;
}

const Manual: FC<Prods> = (prods: Prods) => {
    let output = null;
    if (prods.language === 'en') {
        output = { __html: englishManual };
    } else {
        output = { __html: koreanManual };
    }

    return <div dangerouslySetInnerHTML={output} />;
};
export default Manual;
