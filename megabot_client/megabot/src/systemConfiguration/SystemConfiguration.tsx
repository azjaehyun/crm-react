import React, {useCallback, useEffect, useState, Fragment} from 'react';
import {Button, Card, Col, Collapse, Divider, Input, List, Row} from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';
// @ts-ignore
import Sticky from 'react-stickynode';

import './scss/SysytemConfig.scss';
import {useDataProvider, useVersion} from "ra-core";
import systemConfigService, {
    SystemGroupEntity,
    SystemPropertyEntity,
    PropertyDto
} from "./services/systemConfigService";
import SectionSaveButton from "./SectionSaveButton";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons/lib";

const {Panel} = Collapse;

interface PropertyControlInterface {
    [key: string]: {
        upload: boolean,
        value: string
    }
}

const SystemConfiguration = () => {
    const version = useVersion();
    const dataProvider = useDataProvider();
    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

    const [requestPropertyData, setRequestPropertyData] = useState<PropertyControlInterface>({});

    const [prevGroupList, setPrevGroupList] = useState<Array<SystemGroupEntity>>([]);

    const getAllConfig = useCallback(async () => {
        const response: Array<SystemGroupEntity> = await systemConfigService.getAllSystemConfig(dataProvider)
        setPrevGroupList(response);
        const propertyControlData: PropertyControlInterface = {}
        response.forEach(((group: SystemGroupEntity) => {
            group.properties.forEach((property: SystemPropertyEntity) => {
                propertyControlData[property.key] = {
                    value: "",
                    upload: false,
                }
            })
        }))
        setRequestPropertyData(propertyControlData)
        setIsPageLoaded(true)
    }, [dataProvider, prevGroupList, setIsPageLoaded])
    useEffect(() => {
        getAllConfig();
    }, [version])

    const systemConfigSaveHandler = useCallback(async () => {
        setIsPageLoaded(false);
        for (const key of Object.keys(requestPropertyData).filter(key => requestPropertyData[key].value !== "")) {
            const data: PropertyDto = {key, value: requestPropertyData[key].value};
            await systemConfigService.updateSystemConfig(dataProvider, data);
        }
        getAllConfig();
    }, [dataProvider, getAllConfig, setRequestPropertyData, systemConfigService, requestPropertyData]);

    return (<>
        <Card style={{margin: '50px'}} bordered={true}>
            <Sticky enable={false} innerZ={5}>
                <Card style={{backgroundColor: "#FCFCFC"}}>
                    <Row style={{paddingTop: "50px", width: '100%'}}>
                        <Col span={12}>
                            <h1><b>System config</b></h1>
                        </Col>
                        <Col span={12} style={{textAlign: "right"}}>
                            <Button style={{backgroundColor: "#23344C"}} size={"large"} type={"primary"} onClick={systemConfigSaveHandler}>Save</Button>
                        </Col>
                    </Row>
                </Card>
            </Sticky>
            <br/>
            {isPageLoaded
                ? <Collapse>
                    {prevGroupList.map((group: SystemGroupEntity, index: number) => {
                        const contents = group.properties.map((property: SystemPropertyEntity, index: number) => {
                            const {description, value, key, name} = property
                            return <List.Item
                                key={index}
                                style={{backgroundColor: (index % 2 === 1 ? '#fafafa' : '#ffffff')}}
                            >
                                <div style={{width: "100%"}}>
                                    <h3 style={{color: "#333"}}><b>{name}</b></h3>
                                    <h4 style={{color: "#777"}}>- {description}</h4>
                                    <Input
                                        placeholder={value}
                                        type={"text"}
                                        value={requestPropertyData[key].value}
                                        onChange={(e) => {
                                            const inputString = e.target.value;
                                            setRequestPropertyData({
                                                ...requestPropertyData,
                                                [key]: {
                                                    upload: inputString !== "",
                                                    value: inputString
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </List.Item>
                        })
                        return <Panel header={group.groupName} key={group.groupId}>
                            {contents}
                        </Panel>
                    })}
                </Collapse>
                : <div style={{width: "100%", textAlign: 'center'}}><CircularProgress/></div>
            }
        </Card>
    </>);
};

export default SystemConfiguration;
