import React, { useState, useEffect } from 'react';
import { getCategories, getBreweries, list } from './apiCore';
import Card from './Card';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    breweries: [],
    brewery: "",
    search: "",
    results: [],  
    searched: false,
  });

  const { breweries, brewery, categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  // const loadBreweries = () => {
  //   getBreweries().then((data) => {
  //     if (data.error) {
  //       console.log(data);
  //     } else {
  //       setData({ ...data, breweries: data });
  //     }
  //   });
  // };

  useEffect(() => {
    loadCategories();
  }, []);

  // useEffect(() => {
  //   loadBreweries();
  // }, []);

  const searchData = () => {
    console.log(search, category)
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  // const searchData = () => {
  //   console.log(search, brewery)
  //   if (search) {
  //     list({ search: search || undefined, brewery: brewery }).then(
  //       (response) => {
  //         if (response.error) {
  //           console.log(response.error);
  //         } else {
  //           setData({ ...data, results: response, searched: true });
  //         }
  //       }
  //     );
  //   }
  // };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData()
  };

  const handleChange = (name) => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length === 1) {
      return `Found ${results.length} match`;
    }
    if (searched && results.length > 0) {
      return `Found ${results.length} matches`;
    }
    if (searched && results.length < 1) {
      return `No matches found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">Select category</option>
              {categories.map((category, i) => (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  // const searchForm = () => (
  //   <form onSubmit={searchSubmit}>
  //     <span className="input-group-text">
  //       <div className="input-group input-group-lg">
  //         <div className="input-group-prepend">
  //           <select className="btn mr-2" onChange={handleChange("brewery")}>
  //             <option value="All">Select Brewery</option>
  //             {breweries.map((brewery, i) => (
  //               <option key={i} value={brewery._id}>
  //                 {brewery.name}
  //               </option>
  //             ))}
  //           </select>
  //         </div>

  //         <input
  //           type="search"
  //           className="form-control"
  //           onChange={handleChange("search")}
  //           placeholder="Search by name"
  //         />
  //       </div>
  //       <div className="btn input-group-append" style={{ border: "none" }}>
  //         <button className="input-group-text">Search</button>
  //       </div>
  //     </span>
  //   </form>
  // );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );

};

export default Search;
