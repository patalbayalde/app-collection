import React, { useContext } from 'react';

export default function List({ context }) {
  const { list } = useContext(context);

  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}
