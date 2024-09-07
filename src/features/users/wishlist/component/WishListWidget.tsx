import { useState, useContext, useEffect } from 'react';
import { DbContext } from '../../../../providers/DBProvider';
import { dealsCommentDetails$ } from '../../dreviews/hooks/useDealsReview';
import useWishList from '../hooks/useWishList';
import { DealsReview } from '../../../../Interface/DealsReviewInterface';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


const WishListWidget = (dealId: { pId: string }) => {
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
    const localDb = useContext(DbContext);
    const [updateWishList] = useWishList();


    const toggleWishlist = async () => {
        setIsAddedToWishlist(!isAddedToWishlist);

        if (localDb?.db?.collections['userToken']) {
            const userToken = await localDb?.db?.userToken.find().exec();
            if (userToken?.length > 0) {
                const payload: DealsReview = {
                    comments: '',
                    comId: '',
                    uId: userToken ? userToken[0]._data.uId : '',
                    userName: userToken ? userToken[0]._data.displayName : '',
                    dealsId: dealId.pId,
                    callType: ''
                }

                const dealsCommentSub: Subscription = dealsCommentDetails$.subscribe((d: DealsReview) => {

                    if (d.comId === '') {
                        payload.wishListDealId = !isAddedToWishlist ? dealId.pId : '';
                        updateWishList(payload);
                    } else if (d.comId !== '') {
                        d.wishListDealId = !isAddedToWishlist ? dealId.pId : '';
                        updateWishList(d);
                    }


                    // if (d && d.length > 0) {
                    //     d.forEach((deal: DealsReview) => {

                    //         updateWishList(deal);
                    //     });
                    // }
                });
                dealsCommentSub.unsubscribe();
            }
        }
    }

    useEffect(() => {
        function getWishListStatus() {
            const dealsCommentSub: Subscription = dealsCommentDetails$.pipe(distinctUntilChanged()).subscribe((d: DealsReview) => {
                if (d.wishListDealId !== '' && dealId.pId === d.dealsId) {
                    setIsAddedToWishlist(true);
                }
                console.log("d.wishListDealId", d.wishListDealId);
            });
            dealsCommentSub.unsubscribe();
        }
        getWishListStatus();
    }, []);

    return (
        <button
            className={`pb-2 rounded-full focus:outline-none focus:ring-0 ${isAddedToWishlist
                ? 'text-red-500 focus:ring-red-300'
                : 'text-gray-500 focus:ring-gray-300'
                }`}
            onClick={toggleWishlist}
        >
            <div className="text-center pl-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-6 text-center"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.172 8.172a4 4 0 015.656 0L12 11.343l3.172-3.171a4 4 0 115.656 5.656l-8.243 8.243a.75.75 0 01-1.06 0l-8.243-8.243a4 4 0 010-5.656z"
                    />
                </svg>
            </div>
            <span className={`text-sm font-light ${isAddedToWishlist
                ? 'text-red-500 focus:ring-red-300'
                : 'text-gray-500 focus:ring-gray-300'
                }`}>Wishlist</span>
        </button>
    )
}

export default WishListWidget;