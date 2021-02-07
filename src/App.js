import { useEffect, useState } from "react";
import { fetchImages } from "./api.js";

function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class= "field has-addons" >
                    <div class="control is-expanded" >
                        <div class="select is-fullwidth" >
                            <select name="breed" defaultValue = "shiba" >
                                <option value="shiba" > Shiba</option >
                                <option value="akita" > Akita</option >
                            </select >
                        </div >
                    </div >
                    <div class="control" >
                            <button type="submit" class = "button is-dark" >
                            Reload
                            </button >
                    </div >
                </div >
            </form >
        </div >
    );
}

function Header() {
    return (
        <header class="hero is-dark is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="is-primary">Cute Dog Images!</h1>
                </div>
            </div>
        </header>
    );
}

function Image(props) {
    return (
        <div class="card">
            <div class="card-image">
                <figure>
                    <img src={props.src} alt="cute dog!"/>
                </figure>
            </div>
        </div>
    );
}

function Loading() {
    return <p>Loading...</p>;
}

function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
    }
    
    return (
        <div class="column is-vcentered is-multiline">
            {urls.map((url) => {
                return (
                    <div key={url} class="column is-3">
                        <Image src={url} />
                    </div>
                );
            })}
        </div>
    );
}


function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
        fetchImages("shiba").then((urls) => {
            setUrls(urls);
        });
    }, []);
    function reloadImages(breed) {
        fetchImages(breed).then((urls) => {
            setUrls(urls);
        });
    }
    return (
        <main>
            <section class="section">
                <div class="container">
                    <div>
                        <Form onFormSubmit={reloadImages} />
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <Gallery urls={urls} />
                </div>
            </section>
        </main>
    );
}

function Footer() {
    return (
        <footer class="footer">
            <div class="contet has-text-centered">
                <p>Dog images are retrieved from Dog API.</p>
                <p>
                    <a href="https://dog.ceo/dog-api/about">Donate to the Dog API</a>
                </p>
            </div>
        </footer>        
    )
}
function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;