const fs = require('fs');
const forge = require('node-forge');
const bigInt = require('big-integer');
const path = require('path');
const folderPath = '.rsa/';

function pemExistsValidator(keyPath){
    // create folder if not exists
    if (!fs.existsSync(keyPath)) {
        throw new Error(`Pem does not exists in ${keyPath}! Regenerate the pem keys!`)
    }

}

module.exports = {

    readPublicKeyPem: async () => {
        const keyPath = path.join(folderPath, 'public_key.pem');
        pemExistsValidator(keyPath);

        const publicKeyPEM = fs.readFileSync(keyPath, 'utf8');
        const publicKeyComponents = forge.pki.publicKeyFromPem(publicKeyPEM);
        const { n: modulus, e: encryptionExponent } = publicKeyComponents;

        // Extract modulus and encryption exponent
        const pemModulus = bigInt(modulus.toString());
        const pemEncryptionExponent = bigInt(encryptionExponent.toString());

        return { pemModulus, pemEncryptionExponent };
    },

    readPrivateKeyPem: async () => {
        const keyPath = path.join(folderPath, 'private_key.pem');
        pemExistsValidator(keyPath);

        const privateKeyPEM = fs.readFileSync(keyPath, 'utf8');
        const privateKeyComponents = forge.pki.privateKeyFromPem(privateKeyPEM);
        const { n: modulus, d: decryptionExponent } = privateKeyComponents;

        // Extract modulus and decryption exponent
        const pemModulus = bigInt(modulus.toString());
        const pemDecryptionExponent = bigInt(decryptionExponent.toString());

        return { pemModulus, pemDecryptionExponent };
    }
}