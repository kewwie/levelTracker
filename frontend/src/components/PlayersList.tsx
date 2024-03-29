import Player from "./Player";

const PlayersList = ({ players, type }: { players: any[], type: string }) => {
  return (
    <div>
      {players.map(player => (
        <Player key={player.id} player={player} type={type} />
      ))}
    </div>
  );
};

export default PlayersList;