import React from 'react';

const SearchBar = ({ header, searchValue, setSearchValue }) => {

    const handleSearchInput = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="header">
            <div className="section-title">
                <h1>{header}</h1>
            </div>
            <div className="search">
                {header === 'Favourites' ? null : <input
                    type="text"
                    placeholder="Type any movie..."
                    value={searchValue}
                    onChange={handleSearchInput}
                ></input>}

            </div>
        </div>
    );
}

export default SearchBar;