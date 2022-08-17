import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Store } from "../Store";
import axios from "axios";
import { useContext } from "react";
// import Rating from "./Rating";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    // console.log(data);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  return (
    <div>
      <Card className="product__card">
        <Link to={`/products/${product.slug}`}>
          <img src={product.Image} alt={product.name} />
        </Link>
        <Card.Body>
          <div className="product-info">
            <Link to={`/products/${product.slug}`}>
              <h3>{product.name}</h3>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Card.Text>
              <strong>${product.price}</strong>
            </Card.Text>
            {product.countInStock === 0 ? (
              <Button variant="dark" disabled>
                Out of stock
              </Button>
            ) : (
              <Button onClick={() => addToCartHandler(product)}>
                Add to cart
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
