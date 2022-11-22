import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import CardCategory from "../../components/Category/CardCategory";
import CardHome from "../../components/common/CardHome";
import productApi from "../../api/productApi";

import Pagination from '@mui/material/Pagination';



export default function Index() {
    const [status, setStatus] = useState(false);
    const [filters, setFilters] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    const router = useRouter();
    const slug = router.query.slug
    console.log(slug)
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.product);
    const { menu, isMobile } = useSelector((state) => state.app);

    useEffect(() => {
        if (slug) {
            getDealsCenter("DealsCenter", slug)
        }
    }, [router])

    const getDealsCenter = (type, subType) => {
        productApi.categories(type, subType).then((res) => {
          if (res) {
            // lọc bỏ những cái có endPromotion = null của deals
            let arr = [];
            if (
              slug === "Group-Sale" ||
              slug === "Super-Sale" ||
              slug === "Flash-Sale" ||
              slug === "Deals-of-Day"
            ) {
              arr = res.filter((v) => v.endPromotion !== null);
            } else {
              arr = res;
            }
            setShowFilter(true);
            setStatus(true);
            dispatch({
              type: "product/setProducts",
              payload: { nameKey: "categories", res: arr },
            });
          }
        });
      };

    const onSortRows = (name, v) => {
        const res = _.orderBy(categories, [name], [v]);
        dispatch({
          type: "product/setProducts",
          payload: { nameKey: "categories", res },
        });
      };
      const onFilter = (value) => {
        setFilters({ ...filters, ...value });
      };
      const arr = getListFilter(categories, filters);


    const isNotFound =
    arr?.length === 0 && status === true;

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
      const { pageIndex } = useSelector(state => state.app)
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
        if(pageIndex > 1) {
          setPage(pageIndex)
        }
      }, [pageIndex])
      useEffect(() => {
        dispatch({
          type: "app/setPageDealsCenter",
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


    return (
        <div className="category-page" style={{height: pageHeight ? "13000px" : "auto" }}>
      {/* {showFilter && <SortBar onSortRows={onSortRows} onFilter={onFilter} />} */}
      <div className="container divider"></div>
      <div className="container p-0">
        <div className="grid__4">
          {arr.slice(pagination.start, pagination.end).map((v, i) => (
            <div key={i}>
              <CardHome fluid={isMobile} data={v} />
            </div>
          ))}
        </div>
        <div className="pagination_container">
          {countPage > 1 && <Pagination count={countPage} page={page} onChange={handleChange} color="secondary" variant="outlined" shape="rounded"/>}
        </div>
        {isNotFound && <p className="empty-message">No products were found</p>}
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
