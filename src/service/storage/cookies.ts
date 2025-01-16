import { cookiesKey } from './key';

export const getCookies = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`) || [];
    if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
};

export const setTokenCookies = (token: string, refreshToken: string) => {
    document.cookie = `${cookiesKey.ACCESS_TOKEN}=${token}; path=/; secure; samesite=strict; max-age=604800`;
    document.cookie = `${cookiesKey.REFRESH_TOKEN}=${refreshToken}; path=/; secure; samesite=strict; max-age=604800`;
};
