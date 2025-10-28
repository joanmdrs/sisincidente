// src/components/CategoryForm.js
import React, { useState, useEffect } from "react";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig"; 
import { Button, Form } from "react-bootstrap";

const CategoryForm = ({ selectedCategory, onSave }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        if (selectedCategory) {
            setName(selectedCategory.name);
        } else {
            setName("");
        }
    }, [selectedCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedCategory) {
            const ref = doc(db, "categories", selectedCategory.id);
            await updateDoc(ref, { name });
        } else {
            await addDoc(collection(db, "categories"), { name });
        }
        onSave();
        setName("");
    };

    return (
        <div className="mb-4">
            <h4>{selectedCategory ? "Editar Categoria" : "Nova Categoria"}</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o nome da categoria"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </Form.Group>
                <Button type="submit" variant="primary">
                    {selectedCategory ? "Atualizar" : "Adicionar"}
                </Button>
            </Form>
        </div>
    );
};

export default CategoryForm;
