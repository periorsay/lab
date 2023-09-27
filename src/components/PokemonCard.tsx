function PokemonCard({ pokemon }) {
  return (
    <>
      <div className="">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h2>{pokemon.name}</h2>
      <div className="">
        <p>タイプ</p>
        {pokemon.types.map((type, i) => {
          return <p key={i}>{type.type.name}</p>;
        })}
      </div>
      <div className="">
        <p>高さ:{pokemon.height}</p>
        <p>重さ:{pokemon.weight}</p>
        <p>特性:{pokemon.abilities[0].ability.name}</p>
      </div>
    </>
  );
}

export default PokemonCard;
