import React, { memo, useContext } from 'react';

function BasicSearch({ context }) {
  const { searchValue } = useContext(context);

  const [value, setValue, onClick] = searchValue;

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div>
      <input value={value} onChange={handleChange} />
      <button onClick={onClick}>Search</button>
    </div>
  );
}

const MemoizedBasicSearch = memo(BasicSearch);
export default MemoizedBasicSearch;
