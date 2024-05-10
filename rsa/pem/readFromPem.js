const fs = require('fs');
const forge = require('node-forge');
const bigInt = require('big-integer');

module.exports = {

    readPublicKeyPem: async () => {
        const publicKeyPEM = fs.readFileSync('rsa/keys/public_key.pem', 'utf8');
        const publicKeyComponents = forge.pki.publicKeyFromPem(publicKeyPEM);
        const { n: modulus, e: encryptionExponent } = publicKeyComponents;

        // Extract modulus and encryption exponent
        const pemModulus = bigInt(modulus.toString());
        const pemEncryptionExponent = bigInt(encryptionExponent.toString());

        return { pemModulus, pemEncryptionExponent };
    },

    readPrivateKeyPem: async () => {

        const privateKeyPEM = fs.readFileSync('rsa/keys/private_key.pem', 'utf8');
        const privateKeyComponents = forge.pki.privateKeyFromPem(privateKeyPEM);
        const { n: modulus, d: decryptionExponent } = privateKeyComponents;

        // Extract modulus and decryption exponent
        const pemModulus = bigInt(modulus.toString());
        const pemDecryptionExponent = bigInt(decryptionExponent.toString());

        return { pemModulus, pemDecryptionExponent };
    }
}