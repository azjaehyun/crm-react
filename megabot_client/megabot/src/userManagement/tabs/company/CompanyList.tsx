import React, {FC, useCallback, useEffect, useState} from 'react';
import {Checkbox, Empty, Popconfirm, Table} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import companyService, {CompanyEntity, CompanyData} from '../../service/companyService';
import {useDataProvider, useVersion} from "ra-core";
import CircularProgress from '@material-ui/core/CircularProgress';


interface Props {
    fetchCompanyList: () => void;
    companyList: Array<CompanyEntity>;
    companyData: CompanyData;
    selected: Array<number>;
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
    isPending: boolean;
}

const CompanyList: FC<Props> = (props) => {
    const dataProvider = useDataProvider();
    if(props.isPending){
        return <div style={{width: "100%", textAlign: "center"}}><CircularProgress/></div>;
    } else {

        // delete company
        const deleteCompany = async (companyId: number) => {
            await companyService.deleteCompany(dataProvider, companyId);
            props.fetchCompanyList();
        };

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            }, {
                title: 'Company code',
                dataIndex: 'companyCode',
            }, {
                title: 'Company name',
                dataIndex: 'companyName',
            }, {
                title: 'Create date',
                dataIndex: 'createdOn',
            }, {
                title: 'Update date',
                dataIndex: 'updatedOn',
            }, {
                title: 'state',
                dataIndex: 'state',
            }, {
                dataIndex: 'companyId',
                render: (companyId: number) => (
                    <Popconfirm
                        title="Are you sure delete this company?"
                        onConfirm={()=>deleteCompany(companyId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                ),
            },
        ];



        switch (props.companyList){
            case []:
                return <Empty />;
            default:
                return <Table
                    // rowSelection={{
                    //     selectedRowKeys: props.selected,
                    //     onChange: (selectedRow, selectedEntity)=>{
                    //         console.log(selectedRow)
                    //         console.log(selectedEntity)
                    //     },
                    // }}
                    dataSource={props.companyList.map(company=>({...company, key:company.id}))}
                    // dataSource={props.companyList}
                    columns={columns}
                />;
        }
    }
};

export default CompanyList;
