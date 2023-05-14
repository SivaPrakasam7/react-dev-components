import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import { secondaryApp } from ".";

/* Snapshot lisenter for collection and collectionGroup
   ####################################################
   PARAMS
   slient = to disable default messages after success
*/
export const useFirestore = <T>(silent?: boolean) => {
  const [loading, setLoading] = React.useState(false);
  const firestore = FirebaseFirestore.getFirestore(secondaryApp);

  // You can modify your path based on development and production
  const pathModifier = (text: string) => text;

  // Get document details
  const get = (collectionName: string, id: string) =>
    FirebaseFirestore.getDoc(
      FirebaseFirestore.doc(
        FirebaseFirestore.collection(firestore, pathModifier(collectionName)),
        id
      )
    );

  // Add new document to collection
  const add = async (collectionName: string, data: T) => {
    const collection = FirebaseFirestore.collection(
      firestore,
      pathModifier(collectionName)
    );
    setLoading(true);
    const result = await FirebaseFirestore.addDoc(collection, {
      ...data,
      createdAt: new Date().getTime(),
    })
      .then((res) => res)
      .catch((e) => e);
    setLoading(false);
    return result;
  };

  // Set document detail
  const set = async (collectionName: string, docId: string, data: any) => {
    const collection = FirebaseFirestore.collection(
      firestore,
      pathModifier(collectionName)
    );
    setLoading(true);
    const result = await FirebaseFirestore.setDoc(
      FirebaseFirestore.doc(collection, docId),
      { ...data }
    )
      .then((res) => res)
      .catch((e) => e);
    setLoading(false);
    return result;
  };

  // Update document detail
  const update = async (collectionName: string, docId: string, data: any) => {
    const collection = FirebaseFirestore.collection(
      firestore,
      pathModifier(collectionName)
    );
    setLoading(true);
    const result = await FirebaseFirestore.updateDoc(
      FirebaseFirestore.doc(collection, docId),
      { ...data }
    )
      .then((res) => res)
      .catch((e) => e);
    setLoading(false);
    return result;
  };

  // Delete document by id
  const deleteDoc = async (collectionName: string, docId: string) => {
    const collection = FirebaseFirestore.collection(
      firestore,
      pathModifier(collectionName)
    );
    setLoading(true);
    const result = await FirebaseFirestore.deleteDoc(
      FirebaseFirestore.doc(collection, docId)
    )
      .then((res) => res)
      .catch((e) => e);
    setLoading(false);
    return result;
  };

  return { loading, add, get, set, update, deleteDoc };
};
