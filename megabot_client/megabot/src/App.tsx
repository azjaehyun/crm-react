import React, { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import { TransferProject } from './transferProject';
import customRoutes from './routes';
import englishMessages from './i18n/en';
import projects from './projects';
import dataProviderFactory from './dataProvider';

import 'antd/dist/antd.compact.css';
import './App.css';

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'kr') {
        return import('./i18n/kr').then(messages => messages.default);
    }
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

const App = () => {
    const [dataProvider, setDataProvider] = useState(null);

    useEffect(() => {
        let restoreFetch;

        const fetchDataProvider = async () => {
            restoreFetch = await dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER);
            const dataProviderInstance = await dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER);
            setDataProvider(
                // GOTCHA: dataProviderInstance can be a function
                () => dataProviderInstance
            );
        };

        fetchDataProvider().then(r => {});

        return restoreFetch;
    }, []);

    if (!dataProvider) {
        return (
            <div className="loader-container">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <Admin
            title=""
            authProvider={authProvider}
            dataProvider={dataProvider}
            customReducers={{ theme: themeReducer }}
            customRoutes={customRoutes}
            TransferProject={TransferProject}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
        >
            <Resource name="projects" {...projects} />
            <Resource name="dashboard" {...Dashboard} />
            {/* <Resource name="customers" {...visitors} />
            <Resource
                name="commands"
                {...orders}
                options={{ label: 'Orders' }}
            />
            <Resource name="invoices" {...invoices} />
            <Resource name="products" {...products} />
            <Resource name="categories" {...categories} />
            <Resource name="reviews" {...reviews} /> */}
        </Admin>
    );
};

export default App;
