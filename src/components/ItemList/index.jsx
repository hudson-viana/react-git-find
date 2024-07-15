import PropTypes from "prop-types";
import "./styles.css";

function ItemList({ title, description }) {
  return (
    <div className="item-list">
      <strong>{title}</strong>
      <p>{description}</p>
      <hr />
    </div>
  );
}

ItemList.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ItemList;
