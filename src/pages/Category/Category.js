// src/components/Category.js
import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setSelectedCategory(null);
        setRefresh(!refresh);
    };

    return (
        <Container className="m-0 p-0">
            <Card className="border-0">
                <Card.Body>                 
                    <CategoryForm
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        onSave={handleSave}
                    />
                
                    <CategoryList
                        key={refresh}
                        onEdit={(cat) => setSelectedCategory(cat)}
                    />
                </Card.Body>
            </Card>
        </Container>
  );
};

export default Category;
