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
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Row>
                        <Col md={4}>
                            <CategoryForm
                                selectedCategory={selectedCategory}
                                onSave={handleSave}
                            />
                        </Col>
                        <Col md={8}>
                            <CategoryList
                                key={refresh}
                                onEdit={(cat) => setSelectedCategory(cat)}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
  );
};

export default Category;
