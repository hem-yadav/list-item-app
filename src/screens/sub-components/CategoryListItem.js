import React from "react";
import { Checkbox, Text, ImageView, Icon, Price } from "../../components";
import { areObjectsEqual } from "../../utils";
import { useDispatch } from "react-redux";
import {
  UPDATE_IMAGE_STATE,
  DELETE_LIST_ITEM,
  SET_CATEGORY_SELECTION,
} from "../../actions/constants";
import "../../style/categoryListItem.css";

const areEqual = (
  { isSearchBarActive: isSearchBarActivePrev, data: prevData },
  { isSearchBarActive: isSearchBarActiveNext, data: nextData }
) => {
  return (
    isSearchBarActivePrev === isSearchBarActiveNext &&
    areObjectsEqual(prevData, nextData)
  );
};

export const CategoryListItem = React.memo(
  ({
    data,
    data: {
      image: { ready: currentReady, error: curentError },
    },
    isSearchBarActive,
  }) => {
    const dispatch = useDispatch();

    const updateImageEvent = ({ ready, error }) => {
      dispatch({
        type: UPDATE_IMAGE_STATE,
        value: { ready, error, name: data.name },
      });
    };

    const deleteItem = () => {
      dispatch({
        type: DELETE_LIST_ITEM,
        value: { name: data.name },
      });
    };

    const memoizedCallback = React.useCallback(updateImageEvent, [
      currentReady,
      curentError,
    ]);

    const onItemSelect = (e, { checked }) => {
      dispatch({
        type: SET_CATEGORY_SELECTION,
        value: { name: data.name, checked },
      });
    };

    return (
      <div className={"flex-1"}>
        <div className={"display-flex flex-align-center"}>
          {isSearchBarActive && (
            <Checkbox
              classes={{ wrapper: "margin-right-l" }}
              checked={data.checked}
              onChange={onItemSelect}
            />
          )}
          <ImageView
            {...{
              ...data.image,
              name: data.name,
              updateEventListener: memoizedCallback,
            }}
          />
        </div>
        <div className={"list-item-content"}>
          <div className={"margin-left-xl flex-column flex-center"}>
            {curentError && (
              <Text
                classes={"subscript red-color"}
                text={"Picture upload error. Please try again."}
              />
            )}
            <Text classes={"text-weight-bold"} text={data.name} />
            <Text text={data.description} />
          </div>
          <div
            className={
              "margin-left-xl price-info display-flex flex-align-center"
            }
          >
            <div>
              <Price
                price={data.price}
                classes={{
                  price: data.discountedPrice ? "is-line-through" : "",
                }}
              />
              {data.discountedPrice && <Price price={data.discountedPrice} />}
            </div>
            {isSearchBarActive && (
              <Icon
                onClick={deleteItem}
                icon={"fa-trash icon-m margin-left-m"}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
  areEqual
);
