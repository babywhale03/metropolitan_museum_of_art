import { useState } from "react";
import Art from "../components/Art";
import { Link } from "react-router-dom";

function Home() {
    const [loading, setLoading] = useState(true);
    const [artworks, setArtWorks] = useState([]);
    const [title, setTitle] = useState("");
    const [ids, setIds] = useState([]);
    const onChange = (event) => setTitle(event.target.value);
    const searchArtWork = (event) => {
        if(event.key === "Enter") {
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${title}`)
            .then(response => response.json())
            .then((json) => {
                getDetail(json.objectIDs);
                setIds(json.objectIDs);
                setLoading(false);
                setTitle("");
                console.log(artworks);
            })
        }
    };
    const getDetail = async(response) => {
        console.log(response);
        response.map(async(item, index) => {
            if (index === 0) {
                try {
                    const result = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`);
                    const json = await result.json();
                    setArtWorks(state => {
                        state = [...state, json]
                        return state;
                    });
                } catch(error) {
                    console.log('error');
                }
            }
        })
    }
    return (
        <div className="main">
            <div className="top">
                <div className="heading">
                    <h1>Metropolitan Museum of Art</h1>
                    <p>The Met presents over 5,000 years of art from around the world for everyone to experience and enjoy.</p>
                </div>
                <div className="searchBox">
                    <input
                        onChange={onChange}
                        onKeyPress={searchArtWork}
                        value={title}
                        className="search-bar"
                        type="text"
                        placeholder="Search for Art Work"
                    />
                </div>
            </div>
            <div className="detail">
                <h3>{loading ? "" : `${ids.length} artworks available`} </h3>
            </div>
            <div className="container">
                {artworks.map((artwork) => (
                    <Art   
                        key={artwork.id}
                        id={artwork.id}
                        title={artwork.title}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;