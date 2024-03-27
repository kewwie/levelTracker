export default function Leaderboard({ params }: { params: { guildId: string, type: string } }) {

    return (
        <div>
            <h1>Guild ID: {params.guildId}</h1>
        </div>
    );
}