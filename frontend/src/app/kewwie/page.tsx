
export default async function Login() {
    let data = await fetch(`localhost:80/api/guilds/217055651371679745/users/292948682884775937`)
    var jsonData = await data.json()

    console.log(jsonData)

    return (
        <div>
            <h1>Players</h1>
            <p>{jsonData.username}</p>
            <p>{jsonData.level}</p>
            <p>{jsonData.xp}</p>
            <p>{jsonData.averageXp}</p>
        </div>
    )
}