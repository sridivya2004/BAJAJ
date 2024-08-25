import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await fetch('http://localhost:3000/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonInput,
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h1>Backend Data Processor</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON input...'
            />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <>
                    <select multiple={true} onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </>
            )}
        </div>
    );
}

export default App;
