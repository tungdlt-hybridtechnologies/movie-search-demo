import React, { useState } from 'react';

function Search(props) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = (e) => {
    setSearchValue('');
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className='search'>
      <input value={searchValue} onChange={handleInputChanges} type='text' />
      <button onClick={callSearchFunction} type='sumbit'>
        SEARCH{' '}
      </button>
    </form>
  );
}

export default Search;
