import { useState } from "react";
import Art from "../components/Art";
import Radio from "../components/Radio";
import RadioGroup from "../components/RadioGroup";

function Home() {
    const [loading, setLoading] = useState(true);
    const [artworks, setArtWorks] = useState([]);
    const [title, setTitle] = useState("");
    const [ids, setIds] = useState([]);
    const [search, setSearch] = useState(false);
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
            })
        }
    };
    const getDetail = async(response) => {       
        response.map(async(item, index) => {
            if (index === 0) {
                try {
                    const result = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`);
                    const json = await result.json();
                    console.log(json);
                    setArtWorks(state => {
                        state = [...state, json]
                        return state;
                    });
                } catch(error) {
                    console.log('error');
                }
            }
        })
        console.log(artworks);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${event.target.contact.value}`)
        .then(response => response.json())
        .then((json) => {
            setSearch(true);
        })
        alert(`${event.target.contact.value}`);
    }
    return (
        <div className="main">
            <div className="top">
                <div className="heading">
                    <h1>Metropolitan Museum of Art</h1>
                    <p>The Met presents over 5,000 years of art from around the world for everyone to experience and enjoy.</p>
                </div>
                {search ? (
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
                ) : null
                }
            </div>
            
            {search ? null : (
                <div className="container">
                    <form onSubmit={onSubmit}>
                    <RadioGroup>
                        <Radio name="contact" value="1" defaultChecked>
                        American Decorative Arts
                        </Radio>
                        <Radio name="contact" value="3">
                        Ancient Near Eastern Art
                        </Radio>
                        <Radio name="contact" value="4">
                        Arms and Armor
                        </Radio>
                        <Radio name="contact" value="5">
                        Arts of Africa, Oceania, and the Americas
                        </Radio>
                        <Radio name="contact" value="6">
                        Asian Art
                        </Radio>
                        <Radio name="contact" value="7">
                        The Cloisters
                        </Radio>
                        <Radio name="contact" value="8">
                        The Costume Institute
                        </Radio>
                        <Radio name="contact" value="9">
                        Drawings and Prints
                        </Radio>
                        <Radio name="contact" value="10">
                        Egyptian Art
                        </Radio>
                        <Radio name="contact" value="11">
                        European Paintings
                        </Radio>
                        <Radio name="contact" value="12">
                        European Sculpture and Decorative Arts
                        </Radio>
                        <Radio name="contact" value="13">
                        Greek and Roman Art
                        </Radio>
                        <Radio name="contact" value="14">
                        Islamic Art
                        </Radio>
                        <Radio name="contact" value="15">
                        The Robert Lehman Collection
                        </Radio>
                        <Radio name="contact" value="16">
                        The Libraries
                        </Radio>
                        <Radio name="contact" value="17">
                        Medieval Art
                        </Radio>
                        <Radio name="contact" value="18">
                        Musical Instruments
                        </Radio>
                        <Radio name="contact" value="19">
                        Photographs
                        </Radio>
                        <Radio name="contact" value="21">
                        Modern Art
                        </Radio>
                    </RadioGroup>
                    <button>제출</button>
                    </form>
                </div>
            )}
            {loading ? null : (
                <div className="container">
                    <div className="detail">
                        <h3>{ids.length} artworks available</h3>
                    </div>
                    <div className="showDetail">
                        {artworks && artworks.map((artwork) => (
                            <Art   
                                key={artwork.objectID}
                                id={artwork.objectID}
                                title={artwork.title}
                                coverImg={artwork.primaryImage}
                                artist={artwork.artistDisplayName}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;