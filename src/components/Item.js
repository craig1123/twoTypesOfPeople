import React from 'react';

const Item = ({
  color, item, selectItem, getRef, option, render,
}) => (
  <div className="item-wrapper" style={{ background: option }}>
    <div
      role="presentation"
      ref={getRef}
      className="item"
      onClick={selectItem('one', item.points)}
    >
      <img
        src={`${process.env.PUBLIC_URL}/img/${item.image}`}
        alt="item 1"
        width="100%"
        className={color}
      />
    </div>
    {render}
  </div>
);

export default Item;
