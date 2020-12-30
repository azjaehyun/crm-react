import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, Empty, Switch, Typography} from 'antd';
import AddCompanyForm from './AddCompanyForm';
import CompanyList from './CompanyList';
import {useDataProvider, useVersion} from "ra-core";
import companyService, {CompanyEntity, CompanyData} from "../../service/companyService";
import { PlusOutlined } from '@ant-design/icons';
import departmentService, {DepartmentEntity, DepartmentData} from "../../service/departmentService";
// import Department from "../department/Department";
// import DepartmentList from "../department/DepartmentList";
// import AddDepartmentForm from "../department/AddDepartmentForm";
// import {Paper} from "@material-ui/core";

const { Title } = Typography;

interface Props {
}

const Company: FC<Props> = () => {
    const [visibleAddCompanyForm, setVisibleAddCompanyForm] = useState<boolean>(false);
    const [visibleAddDepartmentForm, setVisibleAddDepartmentForm] = useState<boolean>(false);

    const version = useVersion();
    const dataProvider = useDataProvider();

    /**
     * get Company List
     */
    const [companyList, setCompanyList] = useState<Array<CompanyEntity>>([]);
    const [companyData, setCompanyData] = useState<CompanyData>({})
    const [companyIsPending, setCompanyIsPending] = useState<boolean>(false);
    const [companySelected, setCompanySelected] = useState<Array<number>>([]);
    const fetchCompanyList = useCallback(()=>{
        setCompanyIsPending(true);
        companyService.getListCompany(dataProvider)
            .then((response: {data: Array<CompanyEntity>})=>{
                setCompanyList(response.data);
                const tempCompanyData: CompanyData = {}
                response.data.forEach((company)=>{
                    tempCompanyData[company.companyId] = company
                })
                setCompanyData(tempCompanyData);
                setCompanyIsPending(false);
            });

    },[dataProvider]);

    /**
     * get 'Department Data' when selected 'Company'
     */
    const [departmentData, setDepartmentData] = useState<DepartmentData>({});
    const [departmentFetchTime, setDepartmentFetchTime] = useState(new Date());
    useEffect(()=>{
        // fetchDepartmentListByCompanyName();
        if(companySelected.length === 0){
            setDepartmentFetchTime(new Date)
            return;
        }
        for (const companyId of companySelected) {
            departmentService.getListDepartment(dataProvider, companyId)
                .then((response: {data: Array<DepartmentEntity>})=>{
                    const tempDepartmentData: DepartmentData = {};
                    const {data} = response;
                    data.map((department: DepartmentEntity) => {
                        tempDepartmentData[department.departmentCode] = department;
                    });
                    if (tempDepartmentData !== {}) {
                        setDepartmentData({...departmentData, ...tempDepartmentData});
                    }
                    setDepartmentFetchTime(new Date)
                })
        }
    }, [companySelected]);

    /**
     * parsing departmentData => departmentList
     */
    // const [departmentList, setDepartmentList] = useState<Array<DepartmentEntity>>([])
    // useEffect(()=>{
    //     const result: Array<DepartmentEntity> = [];
    //     Object.keys(departmentData).map((departmentId)=>{
    //         const department = departmentData[departmentId];
    //         companySelected.indexOf(department.companyId) !== -1 && result.push(department)
    //     })
    //     setDepartmentList(result);
    // }, [departmentFetchTime])
    // // useEffect(()=>{
    // //     console.log(departmentList)
    // // }, [departmentList])

    /**
     * initialize
     */
    useEffect(()=>{
        fetchCompanyList();
    },[version]);

    return (
        <div>
            <div>
                <Title level={3}>Company</Title>
                <div className="company-header" style={{ textAlign: 'right', marginBottom: 20 }}>
                    <span style={{marginRight: "10px"}}>Simplify Company List <Switch/></span>
                    <Button icon={<PlusOutlined />} onClick={() => {setVisibleAddCompanyForm(true)}}>
                        Create Company
                    </Button>
                </div>
                <CompanyList
                    fetchCompanyList={fetchCompanyList}
                    companyList={companyList}
                    companyData={companyData}
                    selected={companySelected}
                    setSelected={setCompanySelected}
                    isPending={companyIsPending}
                />
                <AddCompanyForm
                    fetchCompanyList={fetchCompanyList}
                    visible={visibleAddCompanyForm}
                    onClose={() => setVisibleAddCompanyForm(false)}
                />
            </div>
            {/*<div>*/}
            {/*    <Title level={3}>Department</Title>*/}
            {/*    <div className="company-header" style={{ textAlign: 'right', marginBottom: 20 }}>*/}
            {/*        <Button*/}
            {/*            icon={<PlusOutlined />}*/}
            {/*            onClick={() => {setVisibleAddDepartmentForm(true)}}*/}
            {/*        >*/}
            {/*            Create Department*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*    {companySelected.length === 0*/}
            {/*        ?<Empty description={""}/>*/}
            {/*        :<DepartmentList*/}
            {/*            companyData={companyData}*/}
            {/*            departmentList={departmentList}*/}
            {/*        />*/}
            {/*    }*/}
            {/*    <AddDepartmentForm*/}
            {/*        visible={visibleAddDepartmentForm}*/}
            {/*        onClose={() => setVisibleAddCompanyForm(false)}*/}
            {/*        companyList={companyList}*/}
            {/*        companyData={companyData}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
};

export default Company;
