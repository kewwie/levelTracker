import { StyleNumber } from "@/styleNumber";

const Player = ({ player, type }: { player: any, type: string }) => {
    return (
        <div className="bg-gray p-4 rounded-lg shadow-md flex items-center">
            <img src={player.avatarUrl} width={64} height={64} className="rounded-full" />
            <div className="ml-4">
                <h3 className="text-xl font-bold">{player.username}</h3>
                <p className="text-sm">{type.charAt(0).toUpperCase() + type.slice(1)} Xp: {StyleNumber(player[type + "Xp"])}</p>
                <p className="text-sm">{type.charAt(0).toUpperCase() + type.slice(1)} Messages: {StyleNumber(player[type + "Msg"])}</p>
            </div>
        </div>
    );
};

export default Player;