import React, {FC, Fragment, useCallback, useEffect, useState} from 'react';
import {Button, Select, Typography} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddDepartmentForm from './AddDepartmentForm';
import DepartmentList from './DepartmentList';
import {useDataProvider, useVersion} from "ra-core";
import companyService, {CompanyData, CompanyEntity} from "../../service/companyService";
import departmentService, {DepartmentData, DepartmentEntity} from "../../service/departmentService";

const { Title } = Typography;
const { Option } = Select;

const Department: FC = () => {
    const version = useVersion();
    const dataProvider = useDataProvider();

    const [visibleAddDepartmentForm, setVisibleAddDepartmentForm] = useState(false);

    const showAddDepartmentModal = () => {
        setVisibleAddDepartmentForm(true);
    };

    /**
     * get Company List
     */
    const [companyList, setCompanyList] = useState<Array<CompanyEntity>>([]);
    const [companyData, setCompanyData] = useState<CompanyData>({})
    const [companySelected, setCompanySelected] = useState<number>(-1);
    const fetchCompanyList = useCallback(()=>{
        companyService.getListCompany(dataProvider)
            .then((response: {data: Array<CompanyEntity>})=>{
                setCompanyList(response.data);
                const tempCompanyData: CompanyData = {}
                response.data.forEach((company)=>{
                    tempCompanyData[company.companyId] = company
                })
                setCompanyData(tempCompanyData);
            });

    },[dataProvider]);

    /**
     * 'get Department Data' when selected 'Company'
     */
    const [departmentData, setDepartmentData] = useState<DepartmentData>({});
    const [departmentFetchTime, setDepartmentFetchTime] = useState(new Date());
    const [departmentList, setDepartmentList] = useState<Array<DepartmentEntity>>([])
    const getDepartment = useCallback(()=>{
        setDepartmentData({})
        setDepartmentList([])
        departmentService.getListDepartment(dataProvider, companySelected)
            .then((response: {data: Array<DepartmentEntity>})=>{
                const tempDepartmentData: DepartmentData = {};
                const {data} = response;
                data.map((department: DepartmentEntity) => {
                    tempDepartmentData[department.departmentCode] = department;
                });
                setDepartmentData(tempDepartmentData)
                setDepartmentFetchTime(new Date)
            })
    }, [companySelected, setDepartmentData, setDepartmentList]);
    useEffect(()=>{
        getDepartment();
    }, [companySelected, setDepartmentData, setDepartmentList])

    /**
     * parsing departmentData => departmentList
     */
    useEffect(()=>{
        const result: Array<DepartmentEntity> = [];
        Object.keys(departmentData).map((departmentId)=>{
            const department = departmentData[departmentId];
            // companySelected === parseInt(departmentId) && result.push(department)
            result.push(department)
        })
        setDepartmentList(result);
    }, [departmentFetchTime])
    // useEffect(()=>{
    //     console.log(departmentList)
    // }, [departmentList])

    /**
     * initialize
     */
    useEffect(()=>{
        fetchCompanyList();
    },[version]);


    return (
        <Fragment>
            <Title level={3}>Department</Title>
            <Select value={companySelected} style={{width: 200}} onChange={(key) => setCompanySelected(key)}>
                <Option value={-1}>Please select company</Option>
                {companyList.map((company: CompanyEntity, index: number)=>{
                    return <Option key={index} value={company.id}>{company.companyName}</Option>
                })}
            </Select>
            <div className="department-header" style={{ textAlign: 'right', marginBottom: 20 }}>
                <Button icon={<PlusOutlined />} onClick={showAddDepartmentModal}>
                    Create Department
                </Button>
            </div>
            <div className="department-body">
                <DepartmentList
                    departmentList={departmentList}
                    companyData={companyData}
                    getDepartment={getDepartment}
                />
            </div>
            {/*<AddDepartmentForm visible={visibleAddDepartmentForm} onClose={() => setVisibleAddDepartmentForm(false)} />*/}

            <AddDepartmentForm
                visible={visibleAddDepartmentForm}
                onClose={() => setVisibleAddDepartmentForm(false)}
                companyList={companyList}
                companyData={companyData}
            />
        </Fragment>
    );
};

export default Department;
