import React, { FC, useState } from 'react';
import { Tabs } from 'antd';
import SmallTalkQATab from './qa/SmallTalkQATab';
import SmallTalkMRCTab from './mrc/SmallTalkMRCTab';

const { TabPane } = Tabs;

interface Prods {
    botId: any;
}

const SmallTalk: FC<Prods> = (prods: Prods) => {
    const [qaCount, setQACount] = useState<number>(0);
    const [docCount, setDocCount] = useState<number>(0);
    return (
        <div className="content-body" style={{ paddingTop: 0 }}>
            <Tabs defaultActiveKey="qa">
                <TabPane tab={`Q&A (${qaCount})`} key="qa">
                    <SmallTalkQATab botId={prods.botId} onLoaded={(count: number) => setQACount(count)} />
                </TabPane>
                <TabPane tab={`Documents (${docCount})`} key="document">
                    <SmallTalkMRCTab botId={prods.botId} onLoaded={(count: number) => setDocCount(count)} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default SmallTalk;
