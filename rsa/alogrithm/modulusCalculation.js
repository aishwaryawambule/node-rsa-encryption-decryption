const bigInt = require('big-integer');

module.exports = {

    modulusPowerBigInt: async (base, exponent, modulus) => {

        try {
            let result = BigInt(1);
            base = base % modulus;

            while (exponent > BigInt(0)) {
                // If the current bit of the exponent is 1
                if (exponent & BigInt(1)) {
                    result = (result * base) % modulus;
                }
                // Square the base when high number of exponent is used, for reducing the time complexity 
                base = (base * base) % modulus;
                // Right-shift the exponent to consider the next bit
                exponent >>= BigInt(1);
            }

            return result;
        } catch (error) {
            throw new Error(`Cannot calculate Modulus Power! ${error}`);
        }

    },

    // modular multiplicative inverse
    modulusInverse: async (exp, mod) => {
        try {
            const result = exp.modInv(mod);

            if (result === null) {
                throw new Error(`Modular inverse of exp does not exist! ${error}`);
            }
            return result;
        } catch (error) {
            console.log(`Cannot calculate the Modulus Inverse of exp! \n
            ${error}. \n
            Reiterating the prime numbers generation process!`)
            return false;
        }
    }

}