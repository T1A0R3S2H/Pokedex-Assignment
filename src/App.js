import React, { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'

export default function PokemonExplorer() {
  const [pokemon, setPokemon] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [generationFilter, setGenerationFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        const data = await response.json()
        const pokemonDetails = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url)
            return res.json()
          })
        )
        setPokemon(pokemonDetails)
        setFilteredPokemon(pokemonDetails)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Pokemon:', error)
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const filtered = pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPokemon(filtered)
    }, 300),
    [pokemon]
  )

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value)
    filterPokemon(searchTerm, e.target.value, generationFilter)
  }

  const handleGenerationFilterChange = (e) => {
    setGenerationFilter(e.target.value)
    filterPokemon(searchTerm, typeFilter, e.target.value)
  }

  const filterPokemon = (search, type, generation) => {
    let filtered = pokemon

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (type) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === type)
      )
    }

    if (generation) {
      const genRanges = {
        '1': [1, 151],
        '2': [152, 251],
        '3': [252, 386],
        '4': [387, 493],
        '5': [494, 649],
      }
      const [min, max] = genRanges[generation]
      filtered = filtered.filter((p) => p.id >= min && p.id <= max)
    }

    setFilteredPokemon(filtered)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Pokémon Explorer</h1>
      <div className="mb-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full md:w-64"
        />
        <select
          value={typeFilter}
          onChange={handleTypeFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Types</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
        </select>
        
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredPokemon.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <img
              src={p.sprites.front_default}
              alt={p.name}
              className="w-32 h-32 object-contain"
            />
            <h2 className="text-xl font-semibold mt-2 capitalize">{p.name}</h2>
            <div className="flex gap-2 mt-2">
              {p.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`px-2 py-1 rounded text-xs font-semibold text-white ${getTypeColor(
                    type.type.name
                  )}`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getTypeColor(type) {
  const colors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
  }
  return colors[type] || 'bg-gray-500'
}