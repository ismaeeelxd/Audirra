import * as bcrypt from 'bcrypt';
import e from 'express';
export enum PrismaConstants {
    NOT_FOUND = "P2025",
    ALREADY_EXISTS = "P2002"
}

const patterns = {
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
};

export function validateEmail(email: string): boolean {
    const sanitizedEmail = sanitizeEmail(email);
    return patterns.email.test(sanitizedEmail);
}

export function sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

export function generateRandomNumber() : number{
    return Math.floor(Math.random() * 10000);
}

export async function hashPassword(password : string) : Promise<string> {
    return await bcrypt.hash(password,10);
}

export async function comparePassword(password: string, hashedPassword: string) : Promise<boolean> {
    return await bcrypt.compare(password,hashedPassword);
}