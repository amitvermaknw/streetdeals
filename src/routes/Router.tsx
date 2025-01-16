import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useRef } from 'react';
import AdminPrivateRouter from './AdminPrivateRouter';
import UserPrivateRouter from './UserPrivateRouter';

const Header = lazy(() => import('../layouts/Header').then((component) => ({ default: component.default })));
const Login = lazy(() => import('../pages/Login').then((component) => ({ default: component.default })));
const Footer = lazy(() => import('../layouts/Footer').then((component) => ({ default: component.default })));
const DList = lazy(() => import('../pages/DealList').then((component) => ({ default: component.default })));
const ProductDetails = lazy(() => import('../pages/ProductDetails').then((component) => ({ default: component.default })));
const Skeleton = lazy(() => import('../components/ui/Skeleton').then((component) => ({ default: component.default })));
const Home = lazy(() => import('../pages/Home').then((component) => ({ default: component.default })));
const Deals = lazy(() => import('../pages/admin/Deals').then((component) => ({ default: component.default })));
const UserAgreement = lazy(() => import('../pages/UserAgreement').then((component) => ({ default: component.default })));
const PageNotfound = lazy(() => import('../pages/404').then((component) => ({ default: component.default })));
const MyWishList = lazy(() => import('../pages/users/WishList').then((component) => ({ default: component.default })));


interface RefObject {
    f: () => void
}

function Router() {
    const refProps = useRef<RefObject>(null);
    return (
        <>
            <Header onSubscribe={() => { refProps.current?.f() }} />
            <div className='md:container md:mx-auto'>
                <Routes>
                    <Route path="/" element={<Suspense fallback={<Skeleton />}><Home ref={refProps} /></Suspense>}></Route>
                    <Route path="/login" element={<Suspense fallback={<Skeleton />}><Login /></Suspense>}></Route>
                    <Route path="/pdetails/:pid" element={<Suspense fallback={<Skeleton />}><ProductDetails /></Suspense>}></Route>
                    <Route path="/deals" element={<Suspense fallback={<Skeleton />}><DList /></Suspense>}></Route>
                    <Route path="/useragreement" element={<Suspense fallback={<Skeleton />}><UserAgreement /></Suspense>}></Route>
                    <Route element={<AdminPrivateRouter />}>
                        <Route path="/dashboard" element={<Suspense fallback={<Skeleton />}><Deals /></Suspense>}></Route>
                    </Route>
                    <Route element={<UserPrivateRouter />}>
                        <Route path="/mywishlist" element={<Suspense fallback={<Skeleton />}><MyWishList /></Suspense>}></Route>
                    </Route>
                    <Route path="*" element={<Suspense fallback={<Skeleton />}><PageNotfound /></Suspense>}></Route>
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Router;
