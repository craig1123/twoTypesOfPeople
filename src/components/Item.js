import React from 'react';

const Item = ({
  color, item, selectItem, getRef, option, render, number,
}) => (
  <div className="item-wrapper" style={{ background: option }}>
    <div
      role="presentation"
      ref={getRef}
      className="item"
      onClick={selectItem(number, item.points)}
    >
      <img
        src={`${process.env.PUBLIC_URL}/img/${item.image}`}
        alt={item.alt}
        width="100%"
        className={color}
      />
    </div>
    {render}
  </div>
);

export default Item;
