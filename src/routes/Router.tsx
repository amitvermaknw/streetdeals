import { Route, Routes } from 'react-router-dom';
import Header from '../layouts/Header';
import Login from '../pages/Login';
import PrivateRouter from './PrivateRouter';
import Deals from '../pages/admin/Deals';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
//import { DList } from '../features/dlist';
import { lazy, Suspense, useRef } from 'react';
import Skeleton from '../components/ui/Skeleton';
import Footer from '../layouts/Footer';
import UserAgreement from '../pages/UserAgreement';


const DList = lazy(() => import('../features/dlist').then((component) => ({ default: component.DList })))

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
                    <Route element={<PrivateRouter />}>
                        <Route path="/dashboard" element={<Suspense fallback={<Skeleton />}><Deals /></Suspense>}></Route>
                    </Route>
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Router
