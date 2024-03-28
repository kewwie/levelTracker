const PlayersList = ({ players }: { players: any[]}) => {
  return (
    <div>
      {players.map(player => (
        <div key={player.userId}>
          <h2>{player.rank}</h2>
          <p>{player.xp}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayersList;