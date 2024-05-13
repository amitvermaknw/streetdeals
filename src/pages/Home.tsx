import { forwardRef, useImperativeHandle, useState } from "react";
import { Banner, TodaysDeals } from "../features/home";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function Home(props: any) {
//     return (
//         <>
//             <Banner />
//             <TodaysDeals ref={props} />
//             {/* <ProductList /> */}
//         </>
//     )
// }

const Home = forwardRef((_props, ref) => {
    const [isSubscribe, setSubscribe] = useState(false);
    useImperativeHandle(ref, () => ({
        f() {
            setSubscribe(true);
        }
    }));

    return (
        <>
            <Banner />
            <TodaysDeals isSubscribe={isSubscribe} />
            {/* <ProductList /> */}
        </>
    )
});

export default Home;