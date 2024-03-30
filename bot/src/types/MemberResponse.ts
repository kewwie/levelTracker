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
    minutes: number;
    hourlyMinutes: number;
    dailyMinutes: number;
    weeklyMinutes: number;
    monthlyMinutes: number;
    message: string;
}