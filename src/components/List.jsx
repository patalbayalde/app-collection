import React, { memo, useContext } from 'react';

function List({ context }) {
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

const MemoizedList = memo(List);
export default MemoizedList;
