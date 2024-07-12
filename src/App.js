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
  };

  return (
    <div className="device">
      <div className="indicator"></div>
      <div className="lights">
        <span className="light red"></span>
        <span className="light yellow"></span>
        <span className="light green"></span>
      </div>
      <div className="screen">
        <div className="App">
          <h1>Pokemon Search</h1>
          <div>
            <input
              type="text"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              placeholder="Enter Pokemon name"
            />
            <button onClick={searchPokemon}>Search</button>
          </div>
          {error && <p className="error">{error}</p>}
          {pokemon && (
            <div className="pokemon-info">
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3>Stats:</h3>
              <ul>
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="d-pad"></div>
      <div className="button"></div>
    </div>
  );
}

export default App;