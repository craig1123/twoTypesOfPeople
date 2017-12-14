import React from 'react';

const Item = ({ color, item, selectItem }) => (
  <div className="item-wrapper wrapper">
    <div
      role="button"
      tabIndex={0}
      className="item"
      onClick={selectItem(item.points)}
    >
      {/* <img
        src={`${process.env.PUBLIC_URL}/img/${item.image}`}
        alt={item.alt}
        width="100%"
        className={color}
      /> */}
    </div>
  </div>
);

export default Item;
