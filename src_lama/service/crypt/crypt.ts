const generateKey = async (): Promise<CryptoKey> => {
    return await window.crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256,
        },
        true,
        ['encrypt', 'decrypt']
    );
};

const exportKey = async (key: CryptoKey): Promise<string> => {
    const exportedKey = await window.crypto.subtle.exportKey('raw', key);
    const base64Key = await arrayBufferToBase64(exportedKey);
    return base64Key;
};

const importKey = async (base64Key: string): Promise<CryptoKey> => {
    const rawKey = base64ToArrayBuffer(base64Key);
    return await window.crypto.subtle.importKey('raw', rawKey, 'AES-GCM', true, ['encrypt', 'decrypt']);
};

async function arrayBufferToBase64(buffer: ArrayBuffer): Promise<string> {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

interface EncryptedData {
    iv: string;
    ciphertext: string;
}

const encrypt = async (data: string, key: CryptoKey): Promise<EncryptedData> => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Inisialisasi vektor
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    const ciphertext = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        key,
        encodedData
    );

    const ivBase64 = await arrayBufferToBase64(iv.buffer);
    const ciphertextBase64 = await arrayBufferToBase64(ciphertext);

    return {
        iv: ivBase64,
        ciphertext: ciphertextBase64,
    };
};

const decrypt = async (encryptedData: EncryptedData, key: CryptoKey): Promise<string> => {
    const iv = base64ToArrayBuffer(encryptedData.iv);
    const ciphertext = base64ToArrayBuffer(encryptedData.ciphertext);

    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: new Uint8Array(iv),
        },
        key,
        new Uint8Array(ciphertext)
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
};

export default {
    generateKey,
    exportKey,
    importKey,
    encrypt,
    decrypt,
};

// README!!!:
// ;(async () => {

// how to encrypt
//   const cryptoGeneratedKey = await cryptograph.generateKey()
// const tempEncryptedData = await cryptograph.encrypt(JSON.stringify(userWithRole), cryptoGeneratedKey)
// const exportedKey = await cryptograph.exportKey(cryptoGeneratedKey)
// document.cookie = `cgK=${exportedKey}; path=/; secure; samesite=strict; max-age=604800`
// document.cookie = `cgK_2=${tempEncryptedData.iv}; path=/; secure; samesite=strict; max-age=604800`
// localStorage.setItem('kkp_usr', tempEncryptedData.ciphertext)

// how to decrypt
// const tempCipherText = localStorage.getItem('kkp_usr')
// const importedKey = await cryptograph.importKey(getCookies('cgK') as string)
// const tempDecryptedData = await cryptograph.decrypt(
//   {
//     iv: getCookies('cgK_2') as string,
//     ciphertext: tempCipherText as string
//   },
//   importedKey
// )

// })()
