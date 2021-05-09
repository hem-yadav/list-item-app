import React from "react";
import { TextInput, Button, Text } from "../../components";
import "../../style/priceFilter.css";
import { Filter } from ".";
import { connect } from "react-redux";
import { getPriceFilter } from "../../data/accessor";
import { SET_PRICE_FILTER } from "../../actions/constants";

const data = [
  { id: 1, text: "equals" },
  { id: 2, text: "range" },
  { id: 3, text: "less than" },
  { id: 4, text: "more than" },
];

const isActiveClasses = { button: "green-bg", buttonText: "white-color" };
const customClasses = {
  wrapper: "flex-space-between",
  button: "white-green-theme",
};

class PFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: props.priceFilter?.filter,
      price: props.priceFilter?.price || [],
      error: "",
    };
  }

  priceFilterListener = ({ id: filter }) => {
    const price = [...this.state.price];
    filter !== 2 && (price[1] = 0);
    this.setState({ filter, price, error: "" });
  };

  priceChangeListener = (e, { value: price, priceIndex }) => {
    const p = [...this.state.price];
    p[priceIndex] = price;
    this.setState({ price: p });
  };

  applyFilterListener = () => {
    const price = this.state.price,
      filter = this.state.filter;

    if (filter === 2) {
      if (price[0] && price[1] && price[1] < price[0]) {
        this.setState({ error: "To price should be greater than from price" });
        return;
      } else {
        this.setState({ error: "" });
      }
    }

    this.props.actionHandler({
      type: SET_PRICE_FILTER,
      value: { filter, price },
    });
    this.props.handlePricePopup?.({ closePopup: true });
  };

  render() {
    return (
      <div className={`price-wrapper ${this.props.classes}`}>
        <Filter
          parentFilter={this.state.filter}
          isParentControlled
          config={data}
          filterListener={this.priceFilterListener}
          isActiveClasses={isActiveClasses}
          classes={customClasses}
        />
        <TextInput
          inputProps={{
            type: "number",
            value: this.state.price?.[0] || "",
            placeholder: "Enter price",
          }}
          handleChange={this.priceChangeListener}
          classes={{ inputWrapper: `white-green-theme margin-top-l` }}
          icon={"fa-rupee-sign icon-s"}
          meta={{ priceIndex: 0 }}
        />
        {this.state.filter === 2 && (
          <>
            <TextInput
              inputProps={{
                type: "number",
                value: this.state.price?.[1] || "",
                placeholder: "Enter price",
              }}
              handleChange={this.priceChangeListener}
              classes={{
                inputWrapper: `white-green-theme margin-top-l`,
              }}
              icon={"fa-rupee-sign icon-s"}
              meta={{ priceIndex: 1 }}
            />
            {this.state.error && (
              <Text
                classes={"subscript margin-top-m red-color"}
                text={this.state.error}
              />
            )}
          </>
        )}
        <Button
          classes={{
            wrapper: `margin-top-l display-flex flex-end`,
            button: `no-background`,
            buttonText: `green-color uppercase text-weight-bold`,
          }}
          type="submit"
          form="pricefilter"
          key={"price_filter"}
          text={"Apply filter"}
          onClick={this.applyFilterListener}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    priceFilter: getPriceFilter(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionHandler: (action) => dispatch(action),
  };
};

export const PriceFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(PFilter);
