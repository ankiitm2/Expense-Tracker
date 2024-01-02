import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

export const useAddTransactions = () => {
    const TransactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();
    console.log("userID:", userID);
    const addTransactions = async ({
        description, transactionAmount, transactionType,
    }) => {
        await addDoc(TransactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        });
    };
    return { addTransactions };
};
