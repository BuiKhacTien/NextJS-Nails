const initialState = {
  listHome: [],
  pedicureKit: [],
  newProducts: [],
  bestSellers: [],
  lastOrdered: [],
  lastView: [],
  dealsOfDay: [],
  diy: [],
  trending: [],
  featureVideo: [],
  flashSales: [],
  latest: [],
  categories: [],
  info: [{}],
};
export default function index(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case "product/setListHome":
      return { ...state, listHome: action.payload };
    case "product/setProducts":
      return { ...state, [payload.nameKey]: payload.res };
    case "product/sold":
      return updateProducts(state, action.payload, "sold_Times");
    case "product/watching":
      return updateProducts(state, payload, "watching_Times");
    case "product/like":
      return updateProductsNum(state, payload, "liked_Times", "isLiked");
    case "product/shareLogin":
      return updateProductsNum(
        state,
        payload,
        "shared_Times",
        "isShared",
        true
      );
    case "product/shareNotLogin":
      return updateProducts(state, payload, "shared_Times");
    case "product/viewed":
      return updateProducts(state, payload, "viewed_Times");
    default:
      return state;
  }
}

function updateProducts(state, payload, keyName) {
  let products = { ...state };
  for (const [key, value] of Object.entries(products)) {
    if (key === "listHome") {
      const newItem = value.map((item) => {
        if (item.products) {
          const { products } = item;
          const newList = updateArr(products, payload, keyName);
          return { ...item, products: newList };
        }
      });
      products = { ...products, listHome: newItem };
    } else {
      const newItem = updateArr(value, payload, keyName);
      products = { ...products, [key]: newItem };
    }
  }
  return products;
}

function updateProductsNum(state, payload, keyName, statusName, statusValue) {
  let products = { ...state };
  for (const [key, value] of Object.entries(products)) {
    if (key === "listHome") {
      const newItem = value.map((item) => {
        if (item.products) {
          const { products } = item;
          const newList = updateArrNum(
            products,
            payload,
            keyName,
            statusName,
            statusValue
          );
          return { ...item, products: newList };
        }
      });
      products = { ...products, listHome: newItem };
    } else {
      const newItem = updateArrNum(
        value,
        payload,
        keyName,
        statusName,
        statusValue
      );
      products = { ...products, [key]: newItem };
    }
  }
  return products;
}

function updateArr(arr, payload, keyName) {
  return arr.map((v) =>
    v.feature_Id === payload.feature_id ? { ...v, [keyName]: payload.num } : v
  );
}
function updateArrNum(arr, payload, keyName, statusName, statusValue = null) {
  if (!statusName)
    return arr.map((v) => {
      if (v.feature_Id === payload.feature_id) {
        const newItem = { ...v, [keyName]: payload.num };
        const lastView = localStorage.getItem("LAST_VIEW");
        if (lastView && lastView.feature_Id === v.feature_id)
          localStorage.setItem("LAST_VIEW", JSON.stringify(newItem));
        return newItem;
      }
      return v;
    });
  return arr.map((v) => {
    if (v.feature_Id === payload.feature_id) {
      const newItem = {
        ...v,
        [keyName]: payload.num,
        [statusName]: statusValue !== null ? statusValue : !v[statusName],
      };
      const lastView = localStorage.getItem("LAST_VIEW");
      if (lastView && lastView.feature_Id === v.feature_id)
        localStorage.setItem("LAST_VIEW", JSON.stringify(newItem));
      return newItem;
    }
    return v;
  });
}
