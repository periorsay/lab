import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from '@/utils/pokemon';
import PokemonCard from './PokemonCard';
import { set } from 'react-hook-form';

export const Pokemon = () => {
  // api
  const url = 'https://pokeapi.co/api/v2/pokemon';
  // ローディング状態設定
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  const loadPokemon = async (data: any) => {
    let pokemonDatas = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);

        return pokemonRecord;
      }),
    );

    setPokemonData(pokemonDatas);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);

    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevUrl) return;

    setLoading(true);
    console.log(prevUrl);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  // 画面を表示した時に一度だけ実行させる
  useEffect(() => {
    const fetchData = async () => {
      let les = await getAllPokemon(url);
      loadPokemon(les.results);
      setNextUrl(les.next);
      setPrevUrl(les.previous);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="test">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="container">
              {pokemonData.map((pokemon, i) => {
                return <PokemonCard key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
