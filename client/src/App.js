import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {

        // Fetch data from the API
        console.log(process.env.REACT_APP_API_URL);

        fetch(process.env.REACT_APP_API_URL)
            .then(response => response.json())
            .then(data => {
                // Update state with fetched data
                console.log(data);
                setApiData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    HELLO <code>src/App.js</code> and save to reload.
                </p>
                {apiData && (
                    <a
                        className="App-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {apiData.text} {/* Assuming your API response has a 'text' field */}
                    </a>
                )}
            </header>
        </div>
    );
}

export default App;
