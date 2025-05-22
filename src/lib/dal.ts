'use client'
import {getSession} from './sessions'
import {cache} from "react";

export const verifySession = cache(async () => {
    const session = await getSession();
    return { userId: session?.userId, isExpired: session === -1 }
})