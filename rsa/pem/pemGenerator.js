const forge = require('node-forge');
const fs = require('fs');
const bigInt = require('big-integer');
const { modulusInverse } = require('../alogrithm/modulusCalculation');

module.exports = {

    createPemFiles: async = ({ publicKey, privateKey, primes }) => {

        try {
            const { modulus, encryptionExponent } = publicKey;
            const { decryptionExponent } = privateKey;
            const { firstPrime, secondPrime } = primes;
            const firstPrimeMod = firstPrime.mod(firstPrime.subtract(bigInt(1)));
            const secondPrimeMod = secondPrime.mod(secondPrime.subtract(bigInt(1)));
            const primeModInv = modulusInverse(secondPrimeMod, firstPrimeMod);

            /*
                using //!node-forge package
                for the pem file generation since there is seperate 
                algorithm called //! ASN1.DER 
                used for pem file format generation
            */
            const rsaKeys = {
                privateKey: forge.pki.rsa.setPrivateKey(
                    modulus, encryptionExponent, decryptionExponent, firstPrime, secondPrime,
                    firstPrimeMod, secondPrimeMod, primeModInv),
                publicKey: forge.pki.rsa.setPublicKey(modulus, encryptionExponent)
            }

            // convert rsaKeys to PEM type file format
            const privateKeyPem = forge.pki.privateKeyToPem(rsaKeys.privateKey);
            const publicKeyPem = forge.pki.publicKeyToPem(rsaKeys.publicKey);

            // create private key PEM file and store it in directory of your choice
            fs.writeFileSync('rsa/keys/private_key.pem', privateKeyPem, 'utf8');
            console.log('Private key PEM file created successfully.');

            // create public key PEM file and store it in directory of your choice
            fs.writeFileSync('rsa/keys/public_key.pem', publicKeyPem, 'utf8');
            console.log('Public key PEM file created successfully.');

        } catch (error) {
            throw new Error(`Can't create pem file! ${error}`)
        }
    }
}