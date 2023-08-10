import React from "react";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const Rating = ({ value, text, color }) => {
  return (
    // show full/half star icon depending on rating value
    <div className="rating">
      {[1, 2, 3, 4, 5].map((ele, idx) => (
        <span key={idx}>
          {value >= ele ? (
            <StarIcon style={{ color, fontSize: "0.9em" }} />
          ) : value >= ele - 0.5 ? (
            <StarHalfIcon style={{ color, fontSize: "0.9em" }} />
          ) : (
            <StarIcon style={{ color, fontSize: "0.9em" }} />
          )}
        </span>
      ))}
      <span style={{ fontSize: "0.9em" }}>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
