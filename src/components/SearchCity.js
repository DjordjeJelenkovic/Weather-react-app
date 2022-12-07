import React, { useMemo, useState } from 'react'
import FlagsDropdown from './FlagsDropdown';
import { FaSearch } from 'react-icons/fa';
import skyImage from '../images/clear-sky.png'

function SearchCity({ submit, codes, codesString, setEmptyFlag }) {
  // const searchRef = useRef('')
  const [selectedFlag, setSelectedFlag] = useState("NL");
  const [search, setSearch] = useState('')

  const place = useMemo(() => {
    return { flag: selectedFlag, city: search }
  }, [selectedFlag, search])

  const onSubmit = e => {
    e.preventDefault();
    if (!search || search === '' || /^[0-9]+$/.test(search)) {
      setEmptyFlag(true)
    } else {
      submit(place);
    }
  };

  return (
    <form className='searchForm' onSubmit={onSubmit}>
      {/* <label htmlFor='search'>Search</label> */}
      <div className='form-container'>
        <img src={skyImage} alt="sun_with_cloud" width="45" height="45" />
        <FlagsDropdown codes={codes} codesString={codesString} setSelectedFlag={setSelectedFlag}
        />
        <div className='input-container'>
          <input
            id='search'
            type='text'
            placeholder='Search for city'
            // ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='search-button' role='button' type='submit' > <FaSearch /></button>
        </div>
      </div>
    </form >
  )
}

export default SearchCity