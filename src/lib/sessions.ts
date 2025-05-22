'use server'

import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
import { prisma } from '@/lib/prisma'
const COOKIE_NAME = 'session';
const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(token) {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.error('Failed to verify session:', error);
        return null;
    }
}

export async function createSession(userId) {
    const expiresAt = new Date(Date.now() + EXPIRATION_TIME);

    const sessionData = await prisma.session.create({
        data: { userId, expiresAt },
    });

    const sessionToken = await encrypt({ sessionId: sessionData.id, expiresAt });

    (await cookies()).set(COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    return sessionToken;
}

export async function getSession() {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    const payload = await decrypt(token);
    if (!payload) return null;

    const session = await prisma.session.findUnique({
        where: { id: payload.sessionId },
    });

    if (!session || session.expiresAt < new Date()) {
        return null;
    }
    return session;
}

export async function deleteSession() {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    const payload = await decrypt(token);
    if (!payload) return null;

    await prisma.session.delete({ where: { id: payload.sessionId } });
    (await cookies()).delete(COOKIE_NAME);
}