//int 4 bytes big int 8 bytes
const bigInt = require('big-integer');
const { generateTwoPrimes } = require('./helpers/prime');
const { modulusInverse } = require('./alogrithm/modulusCalculation');
const { createPemFiles } = require('./pem/pemGenerator');
const { encryptionExponentCalc } = require('./alogrithm/encryptionAlgo');


// Function to generate Custom RSA Private and Public keys
async function generateRSAKeys(actualBitLength) {

    try {

        // check exponents co-primes
        let exponentCoPrimes = false;
        let encryptionExponent, decryptionExponent, modulus;

        // prime numbers firstPrime and secondPrime
        let firstPrime, secondPrime;

        //* condition validaity unless encryption and decryption exponent are co-primes
        do {
            const { fp, sp } = await generateTwoPrimes(actualBitLength);
            firstPrime = fp;
            secondPrime = sp;
            // Compute modulus and phi (Euler's totient formula)
            //! Official formula used

            modulus = firstPrime.multiply(secondPrime);
            const phi = bigInt((firstPrime.minus(1).multiply(secondPrime.minus(1))))

            //! Official formula 
            //# encryptionExponent×decryptionExponent = 1(phi)
            //# decryptionExponent = (encryptionExponent^−1)mod(phi)

            // Compute encryption exponent
            // smallest and default value of exponent is 65537 max you can use as per your bit size specification
            // const encryptionExponent = bigInt(65537) // default value
            encryptionExponent = await encryptionExponentCalc(phi);

            // Compute decryption exponent
            decryptionExponent = await modulusInverse(encryptionExponent, phi);

            // whether encryption and decryption exponent are not co-primes
            exponentCoPrimes = decryptionExponent ? true : false;

        } while (!exponentCoPrimes)

        const keys = {
            publicKey: { modulus, encryptionExponent },
            privateKey: { modulus, encryptionExponent, decryptionExponent },
            primes: { firstPrime, secondPrime }
        };

        // create PEM format files for storing public and private keys
        await createPemFiles(keys);

    } catch (error) {
        throw new Error(`Can't generate RSA keys! ${error}`);
    }
}

module.exports = {
    generateRSAKeys
};
