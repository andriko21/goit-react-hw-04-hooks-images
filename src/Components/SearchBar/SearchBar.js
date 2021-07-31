import React, { useState } from "react";
import style from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [state, setState] = useState();

  const handleChange = (e) => {
    setState({
      qwery: e.currentTarget.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state.qwery);
    reset();
  };

  const reset = () => {
    setState({
      qwery: "",
    });
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.SearchFormButton}>
          <span className={style.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.SearchFormInput}
          type="text"
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default SearchBar;
