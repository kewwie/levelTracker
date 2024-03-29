"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

import PlayersList from '@/components/PlayersList';

export default function Leaderboard({ params: { guildId, type } }: { params: { guildId: string, type: string } }) {
    const searchParams = useSearchParams();

    const [players, setPlayers] = useState<any[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const response = await fetch(window.origin + `/api/guilds/${guildId}/leaderboard/${searchParams.get("lb")}/${type}?page=${page}&amount=100`);
            const data = await response.json();
            setPlayers(prevPlayers => [...prevPlayers, ...data]);
            setLoading(false);
        };

        loadPosts();
    }, [page]);

    const handleScroll = () => {
        if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
        ) {
        setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
        <h1>Players</h1>
        <PlayersList players={players} />
            {loading && <p>Loading...</p>}
        </div>
    );
}