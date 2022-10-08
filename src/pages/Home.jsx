//https://bobbyhadz.com/blog/react-get-window-width-height


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsThunk,
  filterProductThunk,
  filterCategoryThunk,
} from "../store/slices/products.slice";
import { useNavigate } from "react-router-dom";
import { InputGroup, Form, Button, Row, Col, Card, ListGroup } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const products = useSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  

  return (
    <div className="page-body">
      <h1 className="page-title">e-commerce</h1>
      
      <div className="search-cont">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search product"
            aria-label="Search product"
            aria-describedby="basic-addon2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            onClick={() => dispatch(filterProductThunk(searchValue))}
            variant="outline-secondary"
            id="button-addon2"
          >
            Search
          </Button>
        </InputGroup>
      </div>

      <section className="home-cont">        
        <aside>
           <h4>Categories</h4>
              {categories?.map( category =>
                <ListGroup 
                  key={category.id}
                  onClick={ () => dispatch(filterCategoryThunk(category.id)) }
                >
                  <ListGroup.Item>{category.name}</ListGroup.Item>
                </ListGroup> 
              )}
           
        </aside>      
        <div className="cards-cont">
          <Row xs={1} md={3} className="g-4">
            {products.map((product) => (
              <Col onClick={ () => navigate(`/product/${product.id}`) } key={product.id}>
                <Card >                
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {product.category.name}
                      </Card.Subtitle>
                      <Card.Img variant="top" src={product.productImgs[0]} />
                      
                      <Card.Text>$ {product.price}</Card.Text>
                    </Card.Body>                
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>  
    </div>
  );
};

export default Home;
