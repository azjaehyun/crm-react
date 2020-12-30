import {DataProvider} from "ra-core";
import {Method} from "ra-data-simple-rest/lib";

export interface SystemGroupEntity {
    groupId: number
    groupName: string;
    properties: Array<SystemPropertyEntity>;
    propertyKeyList?: Array<string>;
}

export interface SystemPropertyEntity {
    key: string;
    name: string;
    description: string;
    value: string;
    defaultValue?: string;
    groupId: number;
}

export interface PropertyDto {
    key: string;
    value: string;
}

export default class systemConfigService {
    static getAllSystemConfig = (dataProvider: DataProvider) => {
        return dataProvider.getOne('admin/configuration', {id: ""})
            .then((response)=>{
                return response.data.map((group: SystemGroupEntity)=>{
                    group.groupId = group.properties[0].groupId
                    group.propertyKeyList = group.properties.map((property: SystemPropertyEntity, index: number) => {
                        return property.key;
                    })
                    return group;
                })
            })
    }

    static updateSystemConfig = (dataProvider: DataProvider, property: PropertyDto) =>
        dataProvider.execute({
            method: Method.PUT,
            resource: `admin/configuration/${property.key}`,
            body: {value: property.value},
        })
}
