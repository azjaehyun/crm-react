import { DataProvider } from 'ra-core';
import {Method} from "ra-data-simple-rest/lib";
import {Status} from './type';

export interface CompanyDto {
    companyCode: string,
    companyName: string
}

export type CompanyState = Status;

export interface CompanyEntity {
    id: number,
    companyId: number,
    companyCode: string,
    companyName: string,
    state: CompanyState,
    createdOn: string,
    updatedOn: string
}

export interface CompanyData {[key: string]: CompanyEntity}

export default class companyService {
    static getListCompany = (dataProvider: DataProvider) =>
        dataProvider.execute({
            method: Method.GET,
            resource: `company/all`
        })

    static createCompany = (dataProvider: DataProvider, company: CompanyDto) =>
        dataProvider.create(`company/createNew`, {data: company});

    static deleteCompany = (dataProvider: DataProvider, companyId: number) =>
        dataProvider.execute({
            method: Method.DELETE,
            resource: `company/${companyId}/delete`,
        })

    static updateCompany = (dataProvider: DataProvider, company: CompanyDto) =>
        dataProvider.execute({
            method: Method.PUT,
            resource: `company/${company.companyCode}/update`,
            data: company,
        })
}

