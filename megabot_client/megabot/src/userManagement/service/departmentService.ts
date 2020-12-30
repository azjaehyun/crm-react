import {DataProvider} from 'ra-core';
import {Method} from 'ra-data-simple-rest/lib';
import {Status} from './type';

export type departmentStatus = Status;

export interface DepartmentEntity {
    id: number,
    departmentCode: string,
    departmentName: string,
    companyId: number,
    state: departmentStatus,
    createdOn: string,
    updatedOn: string
}

export interface DepartmentDto {
    companyId: number;
    deptCode: string;
    deptName: string;
}


export interface DepartmentData {[key: string]: DepartmentEntity};

export default class departmentService {
    static getListDepartment = (dataProvider: DataProvider, companyId: number) =>
        dataProvider.execute({
            method: Method.GET,
            resource: `company/${companyId}/dept`
        })

    static createDepartment = (dataProvider: DataProvider, department: DepartmentDto) => {
        const companyId = department.companyId;
        const data = {
            deptCode: department.deptCode,
            deptName: department.deptName
        }
        // return dataProvider.execute({
        //     method: Method.POST,
        //     resource: `company/${companyId}/dept/createNew`,
        //     data: department,
        // })
        return dataProvider.create(`company/${companyId}/dept/createNew`, {data})
    }

    static deleteDepartment = (dataProvider: DataProvider, deleteEntity: {companyId: number, departmentId: number}) =>
        dataProvider.execute({
            method: Method.DELETE,
            resource: `company/${deleteEntity.companyId}/dept/${deleteEntity.departmentId}/delete`
        })
}

