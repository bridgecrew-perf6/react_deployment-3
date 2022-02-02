import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Tips = Loadable(lazy(() => import('views/tips')));
const Workers = Loadable(lazy(() => import('views/workers')));
const Categories = Loadable(lazy(() => import('views/categories')));
const AppUserAccountProfile1 = Loadable(lazy(() => import('views/application/users/account-profile/Profile1')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/tips',
            element: <Tips />
        },
        {
            path: '/workers',
            element: <Workers />
        },
        {
            path: '/categories',
            element: <Categories />
        },
        {
            path: '/user/account-profile/profile1',
            element: <AppUserAccountProfile1 />
        }
    ]
};

export default MainRoutes;
