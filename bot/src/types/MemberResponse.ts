export interface MemberResponse {
    id: number;
    guildId: string;
    userId: string;
    username: string;
    discriminator: string;
    tag: string;
    avatarUrl: string;
    rank: number;
    level: number;
    xp: number;
    averageXp: number;
    hourlyXp: number;
    dailyXp: number;
    weeklyXp: number;
    monthlyXp: number;
    messages: number;
    hourlyMsg: number;
    dailyMsg: number;
    weeklyMsg: number;
    monthlyMsg: number;
    message: string;
}