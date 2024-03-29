const Player = ({ player, type }: { player: any, type: string }) => {
    return (
        <div>
            <h3>{player.username}</h3>
            <p>Xp: {player[type + "Xp"]}</p>
            <p>Messages: {player[type + "Msg"]}</p>
        </div>
    );
};

export default Player;