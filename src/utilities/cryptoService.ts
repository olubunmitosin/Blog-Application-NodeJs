import { generateKeyPairSync } from "crypto";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

// Generate private key pairs
export const generatePrivateKey = () => {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,

        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },

        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
    });

    let privateFileName = "storage/private.pem";
    let publicFileName = "storage/public.pem";
    fs.writeFileSync(privateFileName, privateKey, {flag:'w'});
    fs.writeFileSync(publicFileName, publicKey, {flag:'w'});
}

// Read private key
export const readPrivateKey  = () => {
    return fs.readFileSync("storage/private.pem", "utf-8");
}

// Read public key
export const readPublicKey = () => {
    return fs.readFileSync("storage/public.pem", "utf-8");
}