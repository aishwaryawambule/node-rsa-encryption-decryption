const { modulusPowerBigInt } = require('./modulusCalculation');

module.exports = {

    decryptWithPrivateKey: async (ciphertext, decryptionExponent, modulus) => {

        try {
            decryptionExponent = BigInt(decryptionExponent.toString());
            modulus = BigInt(modulus.toString());

            // Convert ciphertext from hexadecimal string to BigInteger
            const cipherTextBigint = BigInt('0x' + ciphertext);

            // Decrypt ciphertext using RSA private key components
            const decryptedMsg = await modulusPowerBigInt(cipherTextBigint, decryptionExponent, modulus);
 
            // Convert decrypted message from Buffer to hex and then to string
            const decryptedMsgString = Buffer.from(decryptedMsg.toString(16), 'hex').toString('utf8');
 
            return decryptedMsgString;
        } catch (error) {
            throw new Error(`Cannot decrypt the message! ${error}`);
        }
    }

}
