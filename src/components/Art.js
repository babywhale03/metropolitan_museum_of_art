import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Art({id, title, coverImg, artist}) { 
    return (
        <div key={id}>
            <h3>{title}</h3>
            <h3>{id}</h3>
            <img src={coverImg} alt={title} />
            <h3>{artist}</h3>
        </div>
    );
}

Art.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
};

export default Art;