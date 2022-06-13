import React from "react";
const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem,
}) => {
  return (
    <ul class="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          class={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
