import crypt from '../crypt/crypt';
import { getCookies } from './cookies';
import { cookiesKey, storageKey } from './key';

export const setUserDataToLocal = async <T>(data: T) => {
    try {
        const cryptoGeneratedKey = await crypt.generateKey();
        const tempEncryptedData = await crypt.encrypt(JSON.stringify(data), cryptoGeneratedKey);
        const exportedKey = await crypt.exportKey(cryptoGeneratedKey);
        document.cookie = `${cookiesKey.CRYPTO_GENERATE_KEY}=${exportedKey}; path=/; secure; samesite=strict; max-age=604800`;
        document.cookie = `${cookiesKey.CRYPTO_IV_KEY}=${tempEncryptedData.iv}; path=/; secure; samesite=strict; max-age=604800`;
        localStorage.setItem(storageKey.USER_DATA, tempEncryptedData.ciphertext);
    } catch (x) {
        console.warn('failed to encrypt');
        return null;
    }
};

export const getUserDataFromLocal = async () => {
    try {
        const tempCipherText = localStorage.getItem(storageKey.USER_DATA);
        const importedKey = await crypt.importKey(getCookies(`${cookiesKey.CRYPTO_GENERATE_KEY}`) as string);
        const tempDecryptedData = await crypt.decrypt(
            {
                iv: getCookies(`${cookiesKey.CRYPTO_IV_KEY}`) as string,
                ciphertext: tempCipherText as string,
            },
            importedKey
        );
        return JSON.parse(tempDecryptedData);
    } catch (x) {
        console.warn('failed to decrypt');

        window.localStorage.removeItem(storageKey.USER_DATA);
        document.cookie = 'act=; path=/; max-age=0; SameSite=Strict';
        document.cookie = 'rft=; path=/; max-age=0; SameSite=Strict';
        document.cookie = 'cgK=; path=/; max-age=0; SameSite=Strict';
        document.cookie = 'cgK_2=; path=/; max-age=0; SameSite=Strict';
        return null;
    }
};
