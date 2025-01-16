import { useEffect, useState } from "react";
import ReadMore from "../../../../common/ReadMore";
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import { UserInfo } from "../../../../type/UserType";
import { useUserContext } from "../../../authentication/hooks/useUserContext";

interface DealReviewProps {
    prstate: DealsReview;
    helpful: (payload: DealsReview) => void;
    editComment: (uid: string) => void
    deleteComment: (payload: DealsReview) => void;
}

const DealsReviewsList = ({ prstate, helpful, editComment, deleteComment }: DealReviewProps) => {
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
            <div className="flex items-center mb-4 justify-between">
                <div className="flex items-center">
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
                {loggedInUser?.uId === prstate.uId ? <div className="flex">
                    <div className="p-1 rounded-full right-0" onClick={() => editComment(prstate.uId)}>
                        <svg className="h-8 w-8 text-gray-500 hover:text-gray-800" viewBox="0 0 32 32" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                    </div>
                    <div className="p-1 rounded-full" onClick={() => deleteComment(prstate)}>
                        <svg className="h-8 w-8 text-gray-500 hover:text-gray-800" width="20" height="20" viewBox="0 0 32 32" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </div>
                </div> : ''}
            </div>
            {/* <p className="mb-2 text-gray-500 text-sm dark:text-gray-400">{prstate.comments}</p>
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