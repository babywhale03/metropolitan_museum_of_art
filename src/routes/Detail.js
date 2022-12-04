import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function Detail () {
    const [artwork, setArtWork] = useState([]);
    const {id} = useParams();
    const getMovie = useCallback(async () => {
        const json = await(
            await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        ).json();
        console.log(json);
    }, [id]);
    useEffect(() => {
        getMovie();
    }, [getMovie]);
    return (
        <h1>Detail</h1>
    );
}

export default Detail;