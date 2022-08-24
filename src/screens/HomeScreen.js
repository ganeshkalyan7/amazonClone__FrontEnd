import React, { useEffect, useReducer } from "react";
// import data from "../Data";
import axios from "axios";
// import logger from "use-reducer-logger";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import LoadingPage from "../components/LoadingPage";
import MessageBox from "../components/MessageBox";

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  // const productsList = data.products;
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(
          "https://cr7products.herokuapp.com/api/products"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });

        // setProducts(response.data);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    getData();
  }, []);
  // console.log(productsList);

  // console.log(products);
  return (
    <div>
      <div className="body">
        <h1 className="heading">CR7 products</h1>

        <div className="products">
          {loading ? (
            <LoadingPage />
          ) : error ? (
            <div>
              <h1> {error} </h1>
              <MessageBox variant="danger">{error}</MessageBox>
            </div>
          ) : (
            <Row>
              {products.map((product) => (
                <Col
                  className="product"
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.slug}
                >
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
