// import Firebase from 'firebase';
// import { FirebaseDataObj } from '~/application/api/apiUtil';
//
// const getCollection = (path: string) => Firebase.firestore().collection(path);
// const getDocument = (collection: Firebase.firestore.CollectionReference, docID: string) => collection.doc(docID);
//
// const getCollectionData = async (path: string): Promise<Array<FirebaseDataObj>> => {
//   const { docs } = await getCollection(path).get();
//   return docs.map(elem => new FirebaseDataObj(elem.id, elem.data()));
// };
//
// const getDocumentData = async (path: string, docID: string): Promise<FirebaseDataObj> => {
//   const doc = await getDocument(getCollection(path), docID).get();
//   return new FirebaseDataObj(doc.id, doc.data() || {});
// };
//
// const setDocumentData = async (path: string, docID: string, data: any): Promise<void> => {
//   const doc = getDocument(getCollection(path), docID);
//   await doc.set({ ...data }, { merge: true });
// };
//
// const updateDocumentData = async (path: string, docID: string, data: any): Promise<void> => {
//   const doc = getDocument(getCollection(path), docID);
//   await doc.update({ ...data }, { merge: true });
// };
//
// const addBatchData = async (path: string, data: Map<string, any>): Promise<void> => {
//   const batch = Firebase.firestore().batch();
//   const collection = await getCollection(path);
//
//   for (const key of data.keys()) {
//     batch.set(collection.doc(key), data.get(key));
//   }
//
//   await batch.commit();
// };
//
// export {
//   getCollectionData,
//   getDocumentData,
//   setDocumentData,
//   updateDocumentData,
//   addBatchData,
// };
