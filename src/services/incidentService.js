
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createIncident = async (data) => {
    const colRef = collection(db, "incidents");
    const payload = { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), deleted: false };
    const res = await addDoc(colRef, payload);
    return res.id;
};

export const updateIncident = async (id, updates) => {
    const docRef = doc(db, "incidents", id);
    updates.updatedAt = serverTimestamp();
    await updateDoc(docRef, updates);
};

export const getIncidents = async () => {
    const colRef = collection(db, "incidents");
    const snap = await getDocs(query(colRef, orderBy("createdAt", "desc")));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getIncidentById = async (id) => {
    const docRef = doc(db, "incidents", id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
};

