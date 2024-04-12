import { db, } from '../../../services/config';
import { collection, addDoc, getDocs, doc, query, where, orderBy, limitToLast } from "firebase/firestore"

interface InputData {
    token: string;
    status: string;
    timestamp: string
}
export const writeAdminToken = async (data: InputData) => {
    try {
        const docRef = await addDoc(collection(db, "streetdeals_collection", "streetdeals", "admin_token"), {
            ...data
        });
        localStorage.setItem("login_token", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e);
    }

};

export const updateAdminToken = async () => {
    //const docRef = doc(db, "streetdeals_collection", "streetdeals", "admin_token");

    const q = query(collection(db, "streetdeals_collection", "streetdeals", "admin_token"), orderBy("timestamp"), limitToLast(1));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });


    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    // } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    // }

    //const newPostKey = push(ref(database), 'admin_token').key;
    // const recentPostsRef = await query(ref(database, 'admin_token'), limitToLast(1));

    // console.log(recentPostsRef)
    // console.log(recentPostsRef.toString());
    // console.log(recentPostsRef.toJSON());

    // get(child(ref(database), `admin_token`)).then((snapshot) => {
    //     if (snapshot.exists()) {

    //         console.log(snapshot.size);
    //         console.log(snapshot.val())
    //         let count = 0;
    //         snapshot.forEach((child) => {
    //             if (count === snapshot.size)
    //                 console.log(child.val())

    //             count++
    //         })
    //     } else {
    //         console.log("No data available");
    //     }
    // }).catch((error) => {
    //     console.error(error);
    // });


    // const updates = {};
    // const data = {
    //     token: 'test',
    //     status: 'false',
    //     timestamp: new Date().toISOString()
    // }
    // updates['/admin_token/' + newPostKey] = data;

    // const response = await update(ref(database), updates);

    // console.log(newPostKey)
    // console.log(response)
    //return newPostKey;

    // const newPostRef = push(postListRef);
    // return await set(newPostRef, {
    //     token: data.token,
    //     status: data.status,
    //     timestamp: data.timestamp
    // })
};

