import { Route, Routes } from 'react-router-dom';
import Header from '../layouts/Header';
import Login from '../pages/Login';
import PrivateRouter from './PrivateRouter';


function Router() {
    return (
        <>
            <Header />
            <div className='md:container md:mx-auto'>
                <Routes>
                    <Route path="/" element={''}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route element={<PrivateRouter />}>
                        <Route path="/dashboard" element={''}></Route>
                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default Router
