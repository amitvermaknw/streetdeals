import { forwardRef, useImperativeHandle, useState } from "react";
import { Banner, TodaysDeals } from "../features/home";
import { SearchWidget } from "../features/search";
import React from "react";

const Home = forwardRef((_props, ref) => {
    const [isSubscribe, setSubscribe] = useState(false);
    useImperativeHandle(ref, () => ({
        f() {
            setSubscribe(true);
        }
    }));

    return (
        <>
            <SearchWidget />
            <Banner />
            <TodaysDeals isSubscribe={isSubscribe} />
            {/* <ProductList /> */}
        </>
    )
});

export default Home;