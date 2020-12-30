import React, { FC } from 'react';
import { Popconfirm, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import departmentService, {DepartmentEntity} from "../../service/departmentService";
import {CompanyData, CompanyEntity} from "../../service/companyService";
import {Status} from "../../service/type";
import {useDataProvider} from "ra-core";

interface Props {
    departmentList: Array<DepartmentEntity>;
    companyData: CompanyData;
    getDepartment: () => void;
}

interface DepartmentData {
    id: number,
    departmentCode: string,
    departmentName: string,
    companyId: number,
    companyCode: string,
    companyName: string,
    state: Status,
    createdOn: string,
    updatedOn: string,
}

const DepartmentList: FC<Props> = (props) => {
    const dataProvider = useDataProvider();
    // delete Department
    const deleteDepartment = (department: DepartmentEntity) => {
        departmentService.deleteDepartment(
            dataProvider,
            {companyId: department.companyId, departmentId: department.id}
        ).then(()=>{
            props.getDepartment();
        });

    };

    const dataSource: Array<DepartmentData> = props.departmentList.map((department)=>{
        const company = props.companyData[department.companyId];
        const result: DepartmentData = {
            ...department,
            companyCode: company.companyCode,
            companyName: company.companyName
        }
        return result;
    })

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },{
            title: 'Code',
            dataIndex: 'departmentCode',
        },{
            title: 'Name',
            dataIndex: 'departmentName',
        },{
            title: 'Company Name',
            dataIndex: 'companyName',
        },{
            title: 'Company Code',
            dataIndex: 'companyCode',
        },{
            title: 'createdOn',
            dataIndex: 'createdOn',
        },{
            title: 'updatedOn',
            dataIndex: 'updatedOn',
        },{
            title: 'state',
            dataIndex: 'state',
        },{
            render:(department: DepartmentEntity) => (
                <Popconfirm
                    title="Are you sure delete this department?"
                    onConfirm={()=> deleteDepartment(department)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined />
                </Popconfirm>
            ),
        },
    ];

    // return <Table dataSource={dataSource.map((data: DepartmentData)=>({...data, key: data.id}))} columns={columns} />;
    return <Table
        dataSource={dataSource.map((data: DepartmentData, index: number)=>({...data, key: index}))}
        columns={columns}
    />;
};

export default DepartmentList;
