import { Carousel } from 'flowbite-react'
import useGetBanner from '../hooks/useGetBanner';
import GetBannerModel from '../../../model/GetBannerModel';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../../../components/ui/Skeleton';


const Banner = () => {
    const [bstate, fetchBanner] = useGetBanner(GetBannerModel);

    useEffect(() => {
        function getBanner() {
            fetchBanner();
        }
        getBanner();
    }, [])

    return (
        <div className="h-28 sm:h-64 xl:h-80 2xl:h-96">
            {bstate.length ? <Carousel>
                {bstate ? bstate.map((item) => {
                    return <Link to={item.bannerurl} target="_blank" key={item.bid} ><img src={item.bimageurl} alt="" /></Link>
                }) : ''}
            </Carousel> : <Skeleton />}
        </div>
    )
}

export default Banner;