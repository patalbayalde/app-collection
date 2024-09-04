import React, { memo, useContext } from 'react';

function SearchWithoutBtn({ context }) {
  const { searchValue } = useContext(context);

  const [value, setValue] = searchValue;

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div>
      <input value={value} onChange={handleChange} />
    </div>
  );
}

const MemoizedSearchWithoutBtn = memo(SearchWithoutBtn);
export default MemoizedSearchWithoutBtn;
