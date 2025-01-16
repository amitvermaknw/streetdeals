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
                        </div>
                    </div>
                </form>
            </div>
            {signUpDialog && (<SignupWithGoogleDialog onCancel={onSignupDialogCancel} />)}
        </>
    )
}

export default AddDealsReview