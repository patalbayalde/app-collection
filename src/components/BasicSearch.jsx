import React, { useContext } from 'react';

export default function BasicSearch({ context }) {
  const { searchValue } = useContext(context);

  const [value, setValue, onClick] = searchValue;

  const handleChange = (e) => setValue(e.target.value);

  return (
    <>
      <input value={value} onChange={handleChange} />
      <button onClick={onClick}>Search</button>
    </>
  );
}
