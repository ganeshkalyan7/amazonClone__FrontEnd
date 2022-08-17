import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Store } from "./Store";
import { Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import Singin from "./screens/Singin";
import ShippingAdressScreen from "./screens/ShippingAdressScreen";
import SingupScreen from "./screens/SingupScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  // const { state } = useContext(Store);
  // const { cart } = state;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  //signout function
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="d-flex flex-column site-container">
            <ToastContainer position="bottom-center" limit={1} />
            <header>
              <Navbar bg="dark" variant="dark">
                <Container>
                  <LinkContainer to="/">
                    <Navbar.Brand>HOME</Navbar.Brand>
                  </LinkContainer>
                  <Nav className="me-auto">
                    <Link to="/cart" className="nav-link">
                      Cart
                      {cart.cartItems.length > 0 && (
                        <Badge pill bg="danger">
                          {/* {cart.cartItems.length} */}
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                    </Link>
                    {userInfo ? (
                      <NavDropdown
                        title={userInfo.name}
                        id="basic-nav-dropdown"
                      >
                        <Link
                          className="dropdown-item"
                          to="#signout"
                          onClick={signoutHandler}
                        >
                          Sign Out
                        </Link>
                      </NavDropdown>
                    ) : (
                      <Link className="nav-link" to="/signin">
                        Sign In
                      </Link>
                    )}
                  </Nav>
                </Container>
              </Navbar>
            </header>
            <main>
              {/* <Container className="mt-5" id="container"></Container> */}
              <Routes>
                <Route path="/" element={<HomeScreen />}></Route>
                <Route path="/cart" element={<CartScreen />}></Route>
                <Route path="/signin" element={<Singin />}></Route>
                <Route path="/signup" element={<SingupScreen />}></Route>
                <Route path="/order/:id" element={<OrderScreen />}></Route>
                <Route
                  path="/shipping"
                  element={<ShippingAdressScreen />}
                ></Route>
                <Route
                  path="/products/:slug"
                  element={<ProductScreen />}
                ></Route>
                <Route path="/payment" element={<PaymentScreen />}></Route>
                <Route
                  path="/placeorder"
                  element={<PlaceOrderScreen />}
                ></Route>
              </Routes>
            </main>
            <footer>
              <div className="text-center">All rights reserved</div>
            </footer>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
