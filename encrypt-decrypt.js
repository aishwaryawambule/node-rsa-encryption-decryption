const decryptionAlgo = require("./rsa/alogrithm/decryptionAlgo");
const encryptionAlgo = require("./rsa/alogrithm/encryptionAlgo");
const readFromPem = require("./rsa/pem/readFromPem");

module.exports = {
    encryptMessage: async (message) => {
        const { pemModulus, pemEncryptionExponent } = await readFromPem.readPublicKeyPem();
        const cipherText = await encryptionAlgo.encryptWithPublicKey(message, pemEncryptionExponent, pemModulus);
        return cipherText;
    },

    decryptMessage: async (cipherText) => {

        const { pemModulus, pemDecryptionExponent } = await readFromPem.readPrivateKeyPem();
        const decryptedMessage = await decryptionAlgo.decryptWithPrivateKey(cipherText, pemDecryptionExponent, pemModulus);
        return decryptedMessage;
    }
}

