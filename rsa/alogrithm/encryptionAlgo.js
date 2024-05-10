const { rabinMillerPrimeTest } = require('../helpers/primeTest');
const { modulusPowerBigInt } = require('./modulusCalculation');

module.exports = {

    encryptWithPublicKey: async (message, encryptionExponent, modulus) => {

        try {
            encryptionExponent = BigInt(encryptionExponent.toString());
            modulus = BigInt(modulus.toString());

            // Convert message to BigInteger
            //! the main workflow is to convert message to hex, then hex to Bigint 
            const msgBigInt = BigInt('0x' + Buffer.from(message).toString('hex'));

            // Encrypt message using RSA public key components
            const cipherText = await modulusPowerBigInt(msgBigInt, encryptionExponent, modulus);

            // Convert encrypted message to hexadecimal string
            const cipherTextHex = cipherText.toString(16);
            return cipherTextHex;

        } catch (error) {
            throw new Error(`Cannot encrypt the message! ${error}`);
        }
    },

    encryptionExponentCalc: async (phi) => {

        try {
            //! Calculation of encryptionExponent(e) base on phi
            //# e must be relatively prime or Coprime to the number between the given range [ 2 <= e < phi ]
            // relative or coprime is the prime number of phi is the one that has no common factor with phi expect itself or 1  

            for (let i = phi.minus(10); i > 1; i = i.minus(1)) {
                if (!phi.mod(i).isZero() && await rabinMillerPrimeTest(i)) {
                    return i;
                }
            }
            return 1; //default factor 
        } catch (error) {
            console.log(`Cannot create encryption exponent! ${error}`);
            return 1; //default factor
        }
    }
}


