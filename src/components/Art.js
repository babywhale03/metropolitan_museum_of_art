import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Art({id, title, coverImg, artist}) { 
    return (
        <div className="card" key={id}>
            <img src={coverImg} alt={title} />
            <div className="bottom">
                <p className="title"><strong>TITLE :</strong> {title}</p>
                <p className="id"><strong>ID :</strong> {id}</p>
                <p className="artist"><strong>ARTIST :</strong> {artist}</p>
            </div>
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