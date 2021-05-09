import React from "react";
import { connect } from "react-redux";
import { List, Checkbox, Alert, Button, SearchBar } from "../../components";
import {
  CategoryFilter,
  PriceFilter,
  CategoryListItem,
} from "../sub-components";
import { category } from "../../mock/category";
import {
  getCategory,
  getCategoryConfig,
  isSelectAllChecked,
} from "../../data/selectors";
import { getCategoryFilter, getPriceFilter } from "../../data/accessor";
import {
  SET_CATEGORY_LIST,
  SET_SEARCH_TEXT,
  SET_ALL_CATEGORY,
  SET_PRICE_FILTER,
  SEARCH_ICON_CLICKED,
  HANDLE_PRICE_POPUP,
} from "../../actions/constants";

const categoryFilterConfig = getCategoryConfig();

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.actionHandler({
      type: SET_CATEGORY_LIST,
      value: { category },
    });
  }

  textInputListener = (e, { value: searchText }) => {
    this.props.actionHandler({
      type: SET_SEARCH_TEXT,
      value: { searchText },
    });
  };

  onAllCategorySelect = (e, { checked }) => {
    this.props.actionHandler({
      type: SET_ALL_CATEGORY,
      value: { checked, categoryList: this.props.categoryList },
    });
  };

  clearPriceListener = () => {
    this.props.actionHandler({
      type: SET_PRICE_FILTER,
      value: { filter: 1, price: null },
    });
  };

  searchIconListener = ({ isActive: isSearchBarActive }) => {
    this.props.actionHandler({
      type: SEARCH_ICON_CLICKED,
      value: { isSearchBarActive },
    });
  };

  handlePricePopup = ({ closePopup = false }) => {
    this.props.actionHandler({
      type: HANDLE_PRICE_POPUP,
      value: { openPriceFilter: !closePopup },
    });
  };

  render() {
    const {
      isSearchBarActive,
      price,
      isSelectAllChecked,
      categoryList,
    } = this.props;

    return (
      <>
        <div className="app-header padding-xl">
          <SearchBar
            searchIconListener={this.searchIconListener}
            backIconListener={this.searchIconListener}
            filterIconListener={this.handlePricePopup}
            textInputListener={this.textInputListener}
          />
          {categoryList.length && isSearchBarActive ? (
            <Checkbox
              classes={{ wrapper: `margin-top-m` }}
              checked={isSelectAllChecked}
              label={`Select all ${this.props.categoryList.length}`}
              onChange={this.onAllCategorySelect}
            />
          ) : null}
        </div>
        <div className="app-content">
          <CategoryFilter
            categoryFilterConfig={categoryFilterConfig}
            matchingCount={this.props.categoryList.length}
            categoryFilter={this.props.categoryFilter}
          />
          {price && (
            <Button
              text="Clear price filter"
              classes={{
                wrapper: `margin-top-m display-flex flex-center`,
                button: `no-background`,
                buttonText: `blue-color`,
              }}
              onClick={this.clearPriceListener}
            />
          )}
          <List
            data={this.props.categoryList}
            content={({ data }) => (
              <CategoryListItem
                {...{
                  isSearchBarActive,
                  data,
                }}
              />
            )}
          />
          {this.props.openPriceFilter ? (
            <Alert
              title={"Filter by price"}
              content={<PriceFilter handlePricePopup={this.handlePricePopup} />}
            />
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSearchBarActive: state.filter.isSearchBarActive,
    isSelectAllChecked: isSelectAllChecked(state),
    openPriceFilter: state.filter.openPriceFilter,
    price: getPriceFilter(state)?.price?.[0],
    categoryList: getCategory(state),
    categoryFilter: getCategoryFilter(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actionHandler: (action) => dispatch(action),
  };
};

export const Dash = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
