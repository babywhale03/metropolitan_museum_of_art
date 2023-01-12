import { useState } from "react";
import Art from "../components/Art";
import Radio from "../components/Radio";
import RadioGroup from "../components/RadioGroup";

function Home() {
    const [loading, setLoading] = useState(false);
    const [artworks, setArtWorks] = useState([]);
    const [departArtWorks, setDepartArtWorks] = useState([]);
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [ids, setIds] = useState([]);
    const [searchIds, setSearchIds] = useState([]);
    const [search, setSearch] = useState(false);
    const onChange = (event) => setTitle(event.target.value);
    const searchArtWork = (event) => {
        if(event.key === "Enter") {
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentID=${department}&q=${title}`)
            .then(response => response.json())
            .then((json) => {
                getDetail(json.objectIDs.slice(0, 20));
                setIds(json.objectIDs);
                setLoading(true);
                setTitle("");
            })
        }
    };
    const getDetail = async(res) => {       
        res.map(async(item) => {
            const result = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`);
            const json = await result.json();
            setArtWorks(state => {
                state = [json, ...state]
                return state;
            });
        })
    }
    const onSubmit = (event) => {
        event.preventDefault();
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${event.target.department.value}`)
        .then(response => response.json())
        .then((json) => {
            setSearch(true);
            setSearchIds(json.objectIDs);
            getAllArt(json.objectIDs.slice(0, 20));
            setDepartment(event.target.department.value);
        })
        console.log(departArtWorks);
    }
    const getAllArt = async(res) => {
        res.map(async(item) => {
            const result = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`);
            const json = await result.json();
            setDepartArtWorks(state => {
                state = [json, ...state]
                console.log(json);
                return state;
            });
        })
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

            {loading ? (
                <div className="container">
                    <div className="detail">
                        <h2>{ids.length} artworks available</h2>
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
            ) :
            search ? (
                <div className="container">
                    <div className="detail">
                        <h2>{searchIds.length} artworks available</h2>
                    </div>
                    <div className="showDetail">
                        {departArtWorks && departArtWorks.map((artwork) => (
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
            ) : (
                <div className="choose">
                    <h2>Choose Department</h2>
                    <form onSubmit={onSubmit}>
                    <RadioGroup>
                        <Radio name="department" value="1" defaultChecked>
                        American Decorative Arts
                        </Radio>
                        <Radio name="department" value="3">
                        Ancient Near Eastern Art
                        </Radio>
                        <Radio name="department" value="4">
                        Arms and Armor
                        </Radio>
                        <Radio name="department" value="5">
                        Arts of Africa, Oceania, and the Americas
                        </Radio>
                        <Radio name="department" value="6">
                        Asian Art
                        </Radio>
                        <Radio name="department" value="7">
                        The Cloisters
                        </Radio>
                        <Radio name="department" value="8">
                        The Costume Institute
                        </Radio>
                        <Radio name="department" value="9">
                        Drawings and Prints
                        </Radio>
                        <Radio name="department" value="10">
                        Egyptian Art
                        </Radio>
                        <Radio name="department" value="11">
                        European Paintings
                        </Radio>
                        <Radio name="department" value="12">
                        European Sculpture and Decorative Arts
                        </Radio>
                        <Radio name="department" value="13">
                        Greek and Roman Art
                        </Radio>
                        <Radio name="department" value="14">
                        Islamic Art
                        </Radio>
                        <Radio name="department" value="15">
                        The Robert Lehman Collection
                        </Radio>
                        <Radio name="department" value="16">
                        The Libraries
                        </Radio>
                        <Radio name="department" value="17">
                        Medieval Art
                        </Radio>
                        <Radio name="department" value="18">
                        Musical Instruments
                        </Radio>
                        <Radio name="department" value="19">
                        Photographs
                        </Radio>
                        <Radio name="department" value="21">
                        Modern Art
                        </Radio>
                    </RadioGroup>
                    <button>제출</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Home;