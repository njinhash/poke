import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  const searchPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setPokemon(response.data);
      setError('');
    } catch (err) {
      setPokemon(null);
      setError('Pokemon not found');
    }
    setPokemonName(''); // Clear the text area after search
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchPokemon();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Only allow letters and numbers
    if (regex.test(value)) {
      setPokemonName(value);
    } else {
      alert('Only letters and numbers are allowed');
    }
  };

  return (
    <div className="device">
      <div className="indicator"></div>
      <div className="lights">
        <span className="light red"></span>
        <span className="light yellow"></span>
        <span className="light green"></span>
      </div>
      <div className="App">
        <h1 className="gradient-text">Pokemon Search</h1>
        <div className="input-container">
          <input
            type="text"
            value={pokemonName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter Pokemon name/number"
          />
          <button onClick={searchPokemon}>Search</button>
        </div>
        <div className="screen">
          {error && <p className="error">{error}</p>}
          {pokemon ? (
            <div className="pokemon-info">
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3>Stats:</h3>
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Base</th>
                    <th>Stats</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemon.stats.map((stat) => (
                    <tr key={stat.stat.name} className={`stat-${stat.stat.name.replace('_', '-')}`}>
                      <td>{stat.stat.name.replace('-', ' ')}</td>
                      <td>{stat.base_stat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
              <path d="M 30 50
                a 1 1 1 0 1 40 0
                h-12.5
                a 1 1 1 0 0 -15 0
                z"
                fill="#f00" stroke="#222"
              ></path>
              <circle
                cx="50"
                cy="50"
                r="5"
                fill="#222" stroke="#222"
              ></circle>
              <path d="M 30 50
                a 1 1 1 0 0 40 0
                h-12.5
                a 1 1 1 0 1 -15 0
                z"
                fill="#fff" stroke="#222"
              ></path>
            </svg>
          )}
        </div>
      </div>
      <div className="d-pad"></div>
      <div className="button"></div>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00f', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0ff', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default App;
