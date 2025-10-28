// src/components/CategoryList.js
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteCategory, getCategories } from "../../services/categoryService";

const CategoryList = ({ onEdit }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const response = await getCategories()
        console.log(response)
        setCategories(response);
    };

    const handleDelete = async (id) => {
        const res = await deleteCategory(id)

        fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <h4 className="mb-3">Categorias</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.name}</td>
                            <td>
                                <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => onEdit(cat)}
                                >
                                Editar
                                </Button>
                                <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(cat.id)}
                                >
                                Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
  );
};

export default CategoryList;
