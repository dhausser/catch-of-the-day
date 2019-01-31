import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    // Make sure the fish is loaded before we continue!
    if(!fish) return null;

    if(!isAvailable) {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : "fish"} is not longer available!
        </li>
      );
    }
    return (
      <li key={key}>
        <span>{count} lbs {fish.name}</span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if(isAvailable) {
        return prevTotal + count * fish.price
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}
          <li className="total">
            Total:
            <strong>  {formatPrice(total)}</strong>
          </li>
        </ul>
      </div>
    );
  }
}

export default Order;
