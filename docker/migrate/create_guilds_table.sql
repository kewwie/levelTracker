CREATE TABLE [IF NOT EXISTS] guilds(
    id INT AUTO_INCREMENT PRIMARY KEY,
    guildId VARCHAR(255),
    name VARCHAR(255),
    iconUrl VARCHAR(255),
    type VARCHAR(50),
    active BOOLEAN DEFAULT true,
)