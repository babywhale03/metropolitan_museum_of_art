import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Art({id, title}) { 
    return (
        <div>
            <h1>{title}</h1>
            <h1>{id}</h1>
        </div>
    );
}

Art.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
};

export default "Art";