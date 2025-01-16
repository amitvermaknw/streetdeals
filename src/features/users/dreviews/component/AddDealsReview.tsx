import React, { useState, useEffect, useRef } from 'react';
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import { uid } from '../../../../utils/Uid';
import SignupWithGoogleDialog from '../../signup/component/SignupWithGoogleDialog';
import localForage from 'localforage';
import { UserToken } from '../../../authentication/Interface/userTokenInterface';
import { userLoggedInFlag$ } from '../../../authentication/components/SignInWithGoogle';
import { Subscription, distinctUntilChanged } from 'rxjs';

interface ReviewRed {
    addReview: (payload: DealsReview) => void;
    pId: string,
    triggerEdit: Array<DealsReview>
}

const AddDealsReview = ({ addReview, pId, triggerEdit }: ReviewRed) => {
    // const localDb = useContext(DbContext);
    const [comments, setComments] = useState('');
    const [signUpDialog, setSignUpDialog] = useState(false);
    const userLoggedInFlagRef = useRef(userLoggedInFlag$);

    const checkLoggedInStatus = async () => {
        const loggedInUser: UserToken | null = await localForage.getItem("loggedInUser");
        if (!loggedInUser?.accessToken) {
            setSignUpDialog(true);
        }
    }

    const onSignupDialogCancel = () => {
        setSignUpDialog(false);
    }

    useEffect(() => {
        userLoggedInFlagRef.current = userLoggedInFlag$;
        const userLoggedInSub: Subscription = userLoggedInFlagRef.current.pipe(distinctUntilChanged()).subscribe((d: boolean) => {
            if (d == true) {
                setSignUpDialog(false);
            }
        });
        return () => {
            userLoggedInSub.unsubscribe();
        }
    }, [userLoggedInFlagRef]);


    const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (comments !== '') {
            // const userToken = await localDb?.db?.userToken.find().exec();
            const userToken: UserToken | null = await localForage.getItem("loggedInUser");
            const payload: DealsReview = {
                comments: comments,
                comId: uid(),
                uId: userToken ? userToken?.uId : '',
                userName: userToken ? userToken?.displayName : '',
                dealsId: pId,
                callType: triggerEdit.length ? 'update' : 'add',
                photoUrl: userToken ? userToken?.photoURL : '',
            }
            await addReview(payload);
            setComments('');
            triggerEdit.length = 0;
        }
    }

    useEffect(() => {
        if (triggerEdit.length) {
            setComments(triggerEdit[0].comments);
        }
    }, [triggerEdit]);

    return (
        <>
            <div className="col-span-1 m-auto min-h-full min-w-full cursor-pointer overflow-hidden rounded-lg pb-2 pt-6 shadow-md mt-8 border border-gray-100">
                <h1 className="mb-2 ml-4 text-left font-sans font-bold text-md md:text-md xl:text-xl">Post Comment</h1>
                <form className="p-2" onSubmit={submitReview}>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea id="comment" rows={4}
                                className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required
                                onChange={(event) => setComments(event.target.value)}
                                onClick={checkLoggedInStatus}
                                value={comments}
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <button type="submit" className="inline-flex items-center py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                {triggerEdit.length ? 'Update comment' : 'Post comment'}
                            </button>
                            {/* <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                            <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                </svg>
                                <span className="sr-only">Attach file</span>
                            </button>
                            <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                </svg>
                                <span className="sr-only">Set location</span>
                            </button>
                            <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                        </div> */}
                        </div>
                    </div>
                </form>
            </div>
            {signUpDialog && (<SignupWithGoogleDialog onCancel={onSignupDialogCancel} />)}
        </>
    )
}

export default AddDealsReview