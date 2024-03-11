import { Route, Routes } from 'react-router-dom';
import Header from '../layouts/Header';
import Login from '../pages/Login';


function Router() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={''}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </>
    )
}

export default Router
