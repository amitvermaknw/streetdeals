import { useEffect, useState } from "react";
import ReadMore from "../../../../common/ReadMore";
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import { UserInfo } from "../../../../type/UserType";
import { useUserContext } from "../../../authentication/hooks/useUserContext";

const DealsReviewsList = ({ prstate, helpful }: { prstate: DealsReview, helpful: (payload: DealsReview) => void }) => {
    const [helpfulBtnState, setHelpfulBtnState] = useState(prstate.helpful as boolean || false);
    const [totalHelpful, setTotalHelpful] = useState(prstate.totalHelpful as number);
    const [updateHelpful, setUpdateHelpful] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserInfo>();
    const userAuth = useUserContext();

    const getJoiningDate = (date: string | null) => {
        if (date) {
            const joinDate = new Date(date);
            return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(joinDate);
        }
        return null
    }

    const helpfulWidgetFun = () => {
        setHelpfulBtnState((prevState) => {
            if (!prevState) {
                setTotalHelpful((previous) => previous ? previous + 1 : 1);
            } else {
                setTotalHelpful((previous) => previous ? previous - 1 : 0);
            }
            return !prevState;
        });
        setUpdateHelpful(true);
    }

    useEffect(() => {
        if (!helpfulBtnState && updateHelpful) {
            helpful({ ...prstate, helpful: helpfulBtnState, totalHelpful: totalHelpful, callType: 'update' });
        } else if (totalHelpful >= 0 && updateHelpful) {
            helpful({ ...prstate, helpful: helpfulBtnState, totalHelpful: totalHelpful, callType: 'add' });
        }
    }, [helpful, helpfulBtnState, prstate, totalHelpful, updateHelpful]);

    useEffect(() => {
        const fetchUserSchema = async () => {
            const userSchema = await userAuth.setUserSchema();
            if (userSchema) {
                const subscription = userSchema.userToken.findOne().$.subscribe((user) => {
                    if (user) {
                        setLoggedInUser(user);
                    }
                });

                return () => subscription.unsubscribe();
            }
        };
        fetchUserSchema();
    }, []);

    return (
        prstate ? <article className="p-4" key={`${new Date().getMilliseconds()}_${prstate.comId}`}>
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 me-4 rounded-full">
                    {prstate.photoUrl ? <>
                        <img className="w-10 h-10 me-4 rounded-full" src={prstate.photoUrl} alt="" />
                    </> : <svg width="40px" height="40px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#494c4e" d="M9 0a9 9 0 0 0-9 9 8.654 8.654 0 0 0 .05.92 9 9 0 0 0 17.9 0A8.654 8.654 0 0 0 18 9a9 9 0 0 0-9-9zm5.42 13.42c-.01 0-.06.08-.07.08a6.975 6.975 0 0 1-10.7 0c-.01 0-.06-.08-.07-.08a.512.512 0 0 1-.09-.27.522.522 0 0 1 .34-.48c.74-.25 1.45-.49 1.65-.54a.16.16 0 0 1 .03-.13.49.49 0 0 1 .43-.36l1.27-.1a2.077 2.077 0 0 0-.19-.79v-.01a2.814 2.814 0 0 0-.45-.78 3.83 3.83 0 0 1-.79-2.38A3.38 3.38 0 0 1 8.88 4h.24a3.38 3.38 0 0 1 3.1 3.58 3.83 3.83 0 0 1-.79 2.38 2.814 2.814 0 0 0-.45.78v.01a2.077 2.077 0 0 0-.19.79l1.27.1a.49.49 0 0 1 .43.36.16.16 0 0 1 .03.13c.2.05.91.29 1.65.54a.49.49 0 0 1 .25.75z" />
                    </svg>}
                </div>
                <div className="font-medium dark:text-white">
                    <p>{prstate.userName} {prstate?.joinedOn ? <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on {getJoiningDate(prstate?.joinedOn ? prstate.joinedOn : null)}</time> : ''}</p>
                </div>
            </div>
            {/* <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg> 
                <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed in the United Kingdom on <time dateTime="2017-03-03 19:00">March 3, 2017</time></p></footer> */}
            {/* <p className="mb-2 text-gray-500 text-sm dark:text-gray-400">{prstate.comments} fdfd fdadsfdsfsdfd</p>
            <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a> */}
            <ReadMore content={prstate.comments} />
            <aside>
                <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">{helpfulBtnState ? `${totalHelpful} people found this helpful` : ''} </p>
                <div className="flex items-center mt-3">
                    <a
                        onClick={() => helpfulWidgetFun()}
                        className={` ${(loggedInUser?.uId === prstate.uId && !helpfulBtnState) ? 'px-2 py-1 text-xs font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700' : 'px-2 py-1 text-xs font-medium text-blue-700 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'}   `}>
                        Helpful
                    </a>
                    {/* <a href="#" className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a> */}
                </div>
            </aside>
            <hr className="mt-4 mb-2"></hr>

        </article> : ''
    )
}

export default DealsReviewsList;