import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  orderBy,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);
export async function RetrieveData(params) {
  const snapshot = await getDocs(collection(firestore, "user"));
  console.log(snapshot);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}
