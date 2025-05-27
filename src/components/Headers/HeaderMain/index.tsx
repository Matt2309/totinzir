'use client'
import { getSession } from '@/lib/sessions';
import HeaderClient from '../HeaderMainClient';
import {useEffect, useState} from "react";

const fetchSession = async (): Promise<any> => {
    try {
        const session = await getSession();
        return session?.userId;
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return null;
    }
};

export default function HeaderMain() {
    const [session, setSession] = useState(null);
    useEffect(() => {
        fetchSession().then(res => {
            setSession(res);
        });
    }, []);

    return <HeaderClient user={session}/>;
}
