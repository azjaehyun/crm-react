import React, { FC, useCallback, useEffect, useState } from 'react';
import { Col, Input, Row, Select } from 'antd';
import { useDataProvider, useVersion } from 'ra-core';
import BotService from '../../../projects/service/botService';

const { Option } = Select;
const { Search } = Input;

interface Props {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

interface botEntity {
    id: string;
    name: string;
}

export const NONE_SELECTED = 'NONE_SELECTED';

const SectionSelectBot: FC<Props> = (props: Props) => {
    const { selected, setSelected } = props;

    const version = useVersion();
    const dataProvider = useDataProvider();

    const [showSearchBar, setShowSearchBar] = useState<boolean>(true);

    const [botList, setBotList] = useState<Array<botEntity>>([]);
    const getBotList = useCallback(async () => {
        const response = await BotService.search(dataProvider, 'admin', {
            botName: '',
            orderBy: 'CREATED_DATE',
            sort: 'DESC',
            offset: 0,
            limit: 100000,
            category: 2,
        });
        setBotList(response.data.list);
    }, [dataProvider, setBotList]);
    useEffect(() => {
        getBotList();
    }, [getBotList, version]);
    return (
        <>
            <Row gutter={10}>
                <Col sm={showSearchBar ? 6 : 24} xs={showSearchBar ? 12 : 24}>
                    <Select
                        value={selected}
                        style={{ width: '100%' }}
                        onChange={value => {
                            setSelected(value);
                            setShowSearchBar(false);
                            value === NONE_SELECTED && setShowSearchBar(true);
                        }}
                        onMouseEnter={() => selected === NONE_SELECTED && setShowSearchBar(false)}
                        onMouseLeave={() => selected === NONE_SELECTED && setShowSearchBar(true)}
                    >
                        <Option children={'Input'} value={NONE_SELECTED} />
                        {botList.map(bot => (
                            <Option children={bot.name} value={bot.id} key={bot.id} />
                        ))}
                    </Select>
                </Col>
                {showSearchBar && (
                    <Col sm={18} xs={12}>
                        <Search
                            placeholder={'input BotId or BotName'}
                            enterButton={'Show'}
                            onSearch={(value: string) => {
                                const matchedBotList = botList.filter(bot => {
                                    return bot.id === value || bot.name === value;
                                });
                                if (matchedBotList.length !== 0) {
                                    setSelected(matchedBotList[0].id);
                                    setShowSearchBar(false);
                                }
                            }}
                        />
                    </Col>
                )}
            </Row>
        </>
    );
};

export default SectionSelectBot;
