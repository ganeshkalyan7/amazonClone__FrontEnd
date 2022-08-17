import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CheckOutSteps(props) {
  return (
    <div>
      <Row className="checkout-steps">
        <Col className={props.step1 ? "active" : ""}>
          <h5>Sign-In</h5>
        </Col>
        <Col className={props.step2 ? "active" : ""}>
          <h5>Shipping</h5>
        </Col>
        <Col className={props.step3 ? "active" : ""}>
          <h5>Payment</h5>
        </Col>
        <Col className={props.step4 ? "active" : ""}>
          <h5>Place Order</h5>
        </Col>
      </Row>
    </div>
  );
}

export default CheckOutSteps;
