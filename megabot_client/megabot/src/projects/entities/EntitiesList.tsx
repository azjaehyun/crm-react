import React, { FC } from 'react';
import { useTranslate } from 'react-admin';
import { Button, Tabs } from 'antd';
import MyEntities from './MyEntities';
import SystemEntities from './SystemEntities';

const { TabPane } = Tabs;
interface Props {
    activeLoading: any;
    systemEntities: any;
    entities: any;
    onSelectedEntityEvent: any;
    openEditFormEvent?: any;
    deleteEntityEvent: any;
    turnOnSystemEntityEvent: any;
}
const EntitiesList: FC<Props> = props => {
    const translate = useTranslate();

    // ${}
    return (
        <Tabs type="card">
            <TabPane tab={translate(`resources.entities.tab_title.my_entities`)} key="my">
                <MyEntities
                    entityList={props.entities}
                    onSelectedEntity={props.onSelectedEntityEvent}
                    openEditForm={props.openEditFormEvent}
                    deleteEntity={props.deleteEntityEvent}
                />
            </TabPane>
            <TabPane tab={translate(`resources.entities.tab_title.system_entities`)} key="system">
                <SystemEntities
                    activeLoading={props.activeLoading}
                    systemEntities={props.systemEntities}
                    turnOnSystemEntityEvent={props.turnOnSystemEntityEvent}
                    openEditForm={props.openEditFormEvent}
                />
            </TabPane>
        </Tabs>
    );
};

export default EntitiesList;
