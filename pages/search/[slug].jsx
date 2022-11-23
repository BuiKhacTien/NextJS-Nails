import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import productApi from "../../api/productApi"
import CardHome from "../../components/common/CardHome"

import Pagination from '@mui/material/Pagination';


export default function Index() {
  const [filters, setFilters] = useState({});
  const { searchResult, filter } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const paramsSearch = {
    pageIndex: "1",
    pageSize:  "10000",
    searchString:  slug,
  };

  useEffect(() => {
    if(slug && searchResult.length === 0) {
      search(paramsSearch);
    }
  },[slug])

  const search = (params) => {
    productApi.search(params).then((res) => {
      if (res) {
        dispatch({
          type: "product/setProducts",
          payload: { nameKey: "searchResult", res },
        });
      }
    });
  };


  const arr = getListFilter(searchResult, filters);

  // paginatin
  const [pagination, setPagination] = useState({
    start: 0,
    end: 20,
  })
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);
  const handleChange = (event, value) => {
    window.scrollTo(0, 0);
    setPage(value)
    setPagination({
      start: value*20 - 20,
      end: value*20,
    })
  };
  
  const { pageIndexSearch } = useSelector(state => state.app)
  const [pageHeight, setPageHeight] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageHeight(false)
    }, 100)
    return () => {
      clearTimeout(timer)
    }
  },[pageHeight])

  useEffect(() => {
    if(pageIndexSearch > 1) {
      setPage(pageIndexSearch)
    }
  }, [pageIndexSearch])

  useEffect(() => {
    dispatch({
      type: "app/setPageSearch",
      payload: page
    })
    setPagination({
      start: page*20 - 20,
      end: page*20,
    })
  }, [page])

  useEffect(() => {
    if (arr.length > 20) {
      setCountPage(Math.ceil(arr.length/20))
    }
  }, [arr])
  //end pagination

  return (
    <div>
      {/* <SortBar onSortRows={onSortRows} onFilter={onFilter} /> */}
      <div className="container divider"></div>
      <div className="container p-0 container_card_home">
        <div className="grid__4">
          {arr.slice(pagination.start, pagination.end).map((v, i) => (
            <div key={i}>
              <CardHome data={v}/>
            </div>
          ))}
        </div>
        <div className="pagination_container">
          {countPage > 1 && <Pagination count={countPage} page={page} onChange={handleChange} color="secondary" variant="outlined" shape="rounded"/>}
        </div>
        {arr.length < 1 && <p className="empty-message">No products were found</p>}
      </div>
    </div>
  )
}

const getListFilter = (categories = [], filters = {}) => {
  const { prices, brands } = filters;
  const arrFilter = categories.filter(
    (item) => isActivePrice(item, prices) && isActiveBrand(item, brands)
  );
  return arrFilter;
};

const isActivePrice = (item, filters) => {
  if (!filters || filters.length === 0) return true;
  return filters.some(
    (v) => item.priceDiscount >= v.from && item.priceDiscount <= v.to
  );
};
const isActiveBrand = (item, filters) => {
  if (!filters || filters.length === 0) return true;
  return filters.some((v) => item.brand_Id === v.id);
};