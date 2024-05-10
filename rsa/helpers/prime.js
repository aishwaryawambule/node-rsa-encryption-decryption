
const bigInt = require('big-integer');
const { rabinMillerPrimeTest } = require('./primeTest');


//! RSA encryption is based on 2 prime numbers 
//# Initially the important step is to generate the two prime numbers.
// Function to generate these two prime numbers

module.exports = {

    generateTwoPrimes: async (actualBitLength) => {
        try {
            let fp, sp;
            /* 
                Minimum Bit Length is the half of actual bit length:
                    - we multiple the two prime numbers to get the modulus(n) value; 
                        the size of this modulus is actual bit length, which is the key component to fetch the private and public keys in RSA. 
                    - So, size of RSA keys depends on modulus.  Therefore, size of modulus = size of RSA 
            */
            const halvedBitLength = Math.floor(actualBitLength / 2);
            const numberOfInterationsForPrimeValidity = 20; // Number of iterations

            //* Generate first prime number
            //# we generally take base 2; as the power of this base falls within the given bits size.
            do {
                fp = bigInt.randBetween(
                    bigInt(2).pow(halvedBitLength - 1), //* (halvedBitLength - 1) this power gives the exact size of minPrimeBitLength for power of base(2)
                    bigInt(2).pow(halvedBitLength).minus(1) /** power of base with minPrimeBitLength give the output in bit size greater by 1 bit from minPrimeBitLength,
                                                            that's why we substract 1 */
                );
            } while (!await rabinMillerPrimeTest(fp, numberOfInterationsForPrimeValidity));

            //* Generate second prime number
            do {
                sp = bigInt.randBetween(
                    bigInt(2).pow(halvedBitLength - 1), //* (halvedBitLength - 1) this power gives the exact size of minPrimeBitLength for power of base(2)
                    bigInt(2).pow(halvedBitLength).minus(1) /** power of base with minPrimeBitLength give the output in bit size greater by 1 bit from minPrimeBitLength,
                                                            that's why we substract 1 */
                );
            } while (fp.equals(sp) // try to make two primes not same; for security purpose.
                || !await rabinMillerPrimeTest(sp, numberOfInterationsForPrimeValidity));

            return { fp, sp };
        } catch (error) {
            throw new Error(`Can't generate prime numbers! ${error}`);
        }

    }
}

