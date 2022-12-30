import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Art({id, title, coverImg, artist}) { 
    return (
        <div key={id}>
            <h1>{title}</h1>
            <h1>{id}</h1>
            <img src={coverImg} alt={title} />
            <h1>{artist}</h1>
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