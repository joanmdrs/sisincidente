// src/components/CategoryForm.js
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { createCategory, updateCategory } from "../../services/categoryService";

const CategoryForm = ({ selectedCategory, setSelectedCategory, onSave }) => {
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
            await updateCategory(selectedCategory.id, { name });
        } else {
            await createCategory({name})
        }
        onSave();
        setName("");
    };

    const handleCancel = () => {
        setName("")
        setSelectedCategory(null)
    }

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
                <Button variant="danger" className="m-2" onClick={() => handleCancel()}> 
                    Cancelar
                </Button>
            </Form>
        </div>
    );
};

export default CategoryForm;
