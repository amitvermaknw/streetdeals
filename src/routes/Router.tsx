import { Route, Routes } from 'react-router-dom';
import Header from '../layouts/Header';
import Login from '../pages/Login';
import PrivateRouter from './PrivateRouter';
import Deals from '../pages/admin/Deals';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import { PList } from '../features/plist';


function Router() {
    return (
        <>
            <Header />
            <div className='md:container md:mx-auto'>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    {/* <Route path="/deals" element={<Deals />}></Route> */}
                    <Route path="/pdetails" element={<ProductDetails />}></Route>
                    <Route path="/pall" element={<PList />}></Route>
                    {/* <Route path="/upload" element={<UploadImage />}></Route> */}

                    <Route element={<PrivateRouter />}>
                        <Route path="/dashboard" element={<Deals />}></Route>
                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default Router
