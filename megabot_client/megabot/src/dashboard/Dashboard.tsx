import React, { FC, useState } from 'react';

import './backup/scss/dashboard.scss';
import GlobalDashboard from './GlobalDashboard/GlobalDashboard';
import BotDashboard from './BotDashboard/BotDashboard';
import Title from 'antd/es/typography/Title';
import { Container } from '@material-ui/core';
import { Switch } from 'antd';

const Dashboard: FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    return (
        <div style={{ backgroundColor: '#eee', minHeight: window.innerHeight - 48 + 'px' }}>
            <Container>
                <div style={{ maxWidth: 1200 }}>
                    {/*<Title style={{padding: 10, marginBottom: 5}}>Dashboard</Title>*/}
                    {/*TODO: confirm admin*/}
                    {/*=========================================================*/}
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'right',
                            opacity: 0.25,
                        }}
                    >
                        <span>{'(isAdmin: '}</span>
                        <span>
                            <Switch
                                checked={isAdmin}
                                onChange={() => {
                                    setIsAdmin(!isAdmin);
                                }}
                            />
                        </span>
                        <span>{')'}</span>
                        <br />
                    </div>
                    {/*=========================================================*/}
                    {isAdmin && <GlobalDashboard />}
                    <BotDashboard />
                </div>
            </Container>
        </div>
    );
    // const [botList, setBotList] = useState([]);
    // const version = useVersion();
    // const dataProvider = useDataProvider();
    // const loginUser = JSON.parse(sessionStorage.getItem('jhi-talkbotaccount') || '{}');
    //
    // return (
    //     <div className="dashboard-container">
    //         <Header pList={botList} />
    //         <div className="dashboard-body">
    //             <div className="left">
    //                 <Intents />
    //                 <Entities />
    //             </div>
    //             <div className="right">
    //                 <Message />
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default Dashboard;

// orininal code
// import React, {
//     useState,
//     useEffect,
//     useCallback,
//     FC,
//     CSSProperties,
// } from 'react';
// import { useVersion, useDataProvider } from 'react-admin';
// import { useMediaQuery, Theme } from '@material-ui/core';

// import Welcome from './Welcome';
// import MonthlyRevenue from './MonthlyRevenue';
// import NbNewOrders from './NbNewOrders';
// import PendingOrders from './PendingOrders';
// import PendingReviews from './PendingReviews';
// import NewCustomers from './NewCustomers';

// import { Customer, Order, Review } from '../types';

// interface OrderStats {
//     revenue: number;
//     nbNewOrders: number;
//     pendingOrders: Order[];
// }

// interface CustomerData {
//     [key: string]: Customer;
// }

// interface State {
//     nbNewOrders?: number;
//     nbPendingReviews?: number;
//     pendingOrders?: Order[];
//     pendingOrdersCustomers?: CustomerData;
//     pendingReviews?: Review[];
//     pendingReviewsCustomers?: CustomerData;
//     revenue?: number;
// }

// const styles = {
//     flex: { display: 'flex' },
//     flexColumn: { display: 'flex', flexDirection: 'column' },
//     leftCol: { flex: 1, marginRight: '1em' },
//     rightCol: { flex: 1, marginLeft: '1em' },
//     singleCol: { marginTop: '2em', marginBottom: '2em' },
// };

// const Dashboard: FC = () => {
//     const [state, setState] = useState<State>({});
//     const version = useVersion();
//     const dataProvider = useDataProvider();
//     const isXSmall = useMediaQuery((theme: Theme) =>
//         theme.breakpoints.down('xs')
//     );
//     const isSmall = useMediaQuery((theme: Theme) =>
//         theme.breakpoints.down('sm')
//     );

//     const fetchOrders = useCallback(async () => {
//         const aMonthAgo = new Date();
//         aMonthAgo.setDate(aMonthAgo.getDate() - 30);
//         const { data: recentOrders } = await dataProvider.getList('commands', {
//             filter: { date_gte: aMonthAgo.toISOString() },
//             sort: { field: 'date', order: 'DESC' },
//             pagination: { page: 1, perPage: 50 },
//         });
//         const aggregations = recentOrders
//             .filter((order: Order) => order.status !== 'cancelled')
//             .reduce(
//                 (stats: OrderStats, order: Order) => {
//                     if (order.status !== 'cancelled') {
//                         stats.revenue += order.total;
//                         stats.nbNewOrders++;
//                     }
//                     if (order.status === 'ordered') {
//                         stats.pendingOrders.push(order);
//                     }
//                     return stats;
//                 },
//                 {
//                     revenue: 0,
//                     nbNewOrders: 0,
//                     pendingOrders: [],
//                 }
//             );
//         setState(state => ({
//             ...state,
//             revenue: aggregations.revenue.toLocaleString(undefined, {
//                 style: 'currency',
//                 currency: 'USD',
//                 minimumFractionDigits: 0,
//                 maximumFractionDigits: 0,
//             }),
//             nbNewOrders: aggregations.nbNewOrders,
//             pendingOrders: aggregations.pendingOrders,
//         }));
//         const { data: customers } = await dataProvider.getMany('customers', {
//             ids: aggregations.pendingOrders.map(
//                 (order: Order) => order.customer_id
//             ),
//         });
//         setState(state => ({
//             ...state,
//             pendingOrdersCustomers: customers.reduce(
//                 (prev: CustomerData, customer: Customer) => {
//                     prev[customer.id] = customer; // eslint-disable-line no-param-reassign
//                     return prev;
//                 },
//                 {}
//             ),
//         }));
//     }, [dataProvider]);

//     const fetchReviews = useCallback(async () => {
//         const { data: reviews } = await dataProvider.getList('reviews', {
//             filter: { status: 'pending' },
//             sort: { field: 'date', order: 'DESC' },
//             pagination: { page: 1, perPage: 100 },
//         });
//         const nbPendingReviews = reviews.reduce((nb: number) => ++nb, 0);
//         const pendingReviews = reviews.slice(0, Math.min(10, reviews.length));
//         setState(state => ({ ...state, pendingReviews, nbPendingReviews }));
//         const { data: customers } = await dataProvider.getMany('customers', {
//             ids: pendingReviews.map((review: Review) => review.customer_id),
//         });
//         setState(state => ({
//             ...state,
//             pendingReviewsCustomers: customers.reduce(
//                 (prev: CustomerData, customer: Customer) => {
//                     prev[customer.id] = customer; // eslint-disable-line no-param-reassign
//                     return prev;
//                 },
//                 {}
//             ),
//         }));
//     }, [dataProvider]);

//     useEffect(() => {
//         fetchOrders();
//         fetchReviews();
//     }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

//     const {
//         nbNewOrders,
//         nbPendingReviews,
//         pendingOrders,
//         pendingOrdersCustomers,
//         pendingReviews,
//         pendingReviewsCustomers,
//         revenue,
//     } = state;
//     return isXSmall ? (
//         <div>
//             <div style={styles.flexColumn as CSSProperties}>
//                 <div style={{ marginBottom: '2em' }}>
//                     <Welcome />
//                 </div>
//                 <div style={styles.flex}>
//                     <MonthlyRevenue value={revenue} />
//                     <NbNewOrders value={nbNewOrders} />
//                 </div>
//                 <div style={styles.singleCol}>
//                     <PendingOrders
//                         orders={pendingOrders}
//                         customers={pendingOrdersCustomers}
//                     />
//                 </div>
//             </div>
//         </div>
//     ) : isSmall ? (
//         <div style={styles.flexColumn as CSSProperties}>
//             <div style={styles.singleCol}>
//                 <Welcome />
//             </div>
//             <div style={styles.flex}>
//                 <MonthlyRevenue value={revenue} />
//                 <NbNewOrders value={nbNewOrders} />
//             </div>
//             <div style={styles.singleCol}>
//                 <PendingOrders
//                     orders={pendingOrders}
//                     customers={pendingOrdersCustomers}
//                 />
//             </div>
//         </div>
//     ) : (
//         <div style={styles.flex}>
//             <div style={styles.leftCol}>
//                 <div style={styles.flex}>
//                     <MonthlyRevenue value={revenue} />
//                     <NbNewOrders value={nbNewOrders} />
//                 </div>
//                 <div style={styles.singleCol}>
//                     <Welcome />
//                 </div>
//                 <div style={styles.singleCol}>
//                     <PendingOrders
//                         orders={pendingOrders}
//                         customers={pendingOrdersCustomers}
//                     />
//                 </div>
//             </div>
//             <div style={styles.rightCol}>
//                 <div style={styles.flex}>
//                     <PendingReviews
//                         nb={nbPendingReviews}
//                         reviews={pendingReviews}
//                         customers={pendingReviewsCustomers}
//                     />
//                     <NewCustomers />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
