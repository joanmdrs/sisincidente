import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import { db } from "../firebaseConfig"


export const createCategory = async (data) => {
    try {
        const colRef = collection(db, "categories");
        const payload = {...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), deleted: false};
        const res = await addDoc(colRef, payload)
        return { id: res.id, success: true, message: "Documento criado com sucesso!" }
    } catch (error) {
        console.error("Erro ao criar o documento: ", error);
        throw error;
    }
}

export const updateCategory = async (id, updates) => {
    try {
        const docRef = doc(db, "categories", id);
        updates.updatedAt = serverTimestamp();
        await updateDoc(docRef, updates);
        return { success: true, message: "Documento atualizado com sucesso!"}
    } catch (error) {
        console.error("Erro ao tentar atualizar o documento: ", error)
        throw error;
    } 
}

export const getCategories = async () => {
    try {
        const colRef = collection(db, "categories");
        const snap = await getDocs(query(colRef, orderBy("createdAt", "desc")));
        const categories = snap.docs.map(d => ({ id: d.id, ...d.data()}));
        return categories
    } catch (error) {
        console.error("Erro ao tentar buscar os documentos: ", error)
        throw error;
    }
}

export const getCategoryByName = async (name) => {
    try {
        const q = query(collection(db, "categories"), where("name", "==", name));

        const snap = await getDocs(q)
        const categories = snap.docs.map(d => ({id: d.id, ...d.data()}));
        return categories;
    } catch (error) {
        console.error("Erro ao buscar categoria:", error);
        throw error;
    }
}

export const getCategoryById = async (id) => {
    try {
        const docRef = doc(db, "categories", id);
        const snap = await getDoc(docRef);
        if (!snap.exists()) return null;
        return { id: snap.id, ...snap.data()};
    } catch (error) {
        console.error("Erro ao tentar buscar o documento: ", error)
        throw error;
    }
}

export const deleteCategory = async (id) => {
    try {
        await deleteDoc(doc(db, "categories", id));
        return { success: true, message: "Documento deletado!" };
    } catch (error) {
        console.error("Erro ao tentar excluir o documento:", error);
        throw error;
    }
}