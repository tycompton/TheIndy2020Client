import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts, getBreweries } from "./apiCore";
import CheckBox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import Search from './Search';

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [breweries, setBreweries] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
        // console.log(data);
      }
    }); 
  };

  const initBreweries = () => {
    getBreweries().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setBreweries(data);
        // console.log(data);
      }
    }); 
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size)
        setSkip(0)
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;

    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    }); 
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  }; 

  useEffect(() => {
    initCategories();
    initBreweries();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  // Checkbox filtering
  const handleFilters = (filters, filterBy) => {
    // console.log("Shop", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  // Radiobox filtering
  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Beer Room"
      description="Shop our huge selection of beers"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
        <h4>Filter by Brewery</h4>
        <ul>
          
            <CheckBox
              categories={breweries}
              handleFilters={(filters) => handleFilters(filters, "brewery")}
            />
          </ul>     
          <h4>Filter by style</h4>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter by price</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          {/* <Search /> */}
          {/* <h2 className="mb-4">Products</h2> */}
          <div className="row">
            {filteredResults.map((product, i) => (
              <div key={i} className="col-md-6 col-lg-4 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
