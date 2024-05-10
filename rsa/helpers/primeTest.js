const bigInt = require('big-integer');
const { modulusPower } = require('../alogrithm/modulusCalculation');

//! The Miller–Rabin primality test or Rabin–Miller primality test is a probabilistic primality test:
//! An algorithm which determines whether a given number is likely to be prime. 

// check whether num is the witness to randNum being composite
async function isWitness(num, randNum, oddNumber, exponentOf2) {

    //! main formula
    //# y = num^oddNumber mod randNum
    /*
        below code is written based on above witness formula;
        you can visit official documentation to understand the formula in depth
    */
    let y = bigInt(num).modPow(oddNumber, randNum);
    if (y.equals(bigInt(1)) || y.equals(randNum.minus(1))) {
        return false; // proabably a prime
    }
    for (let i = 0; i < exponentOf2 - 1; i++) {
        y = y.modPow(2, randNum);

        if (y.equals(bigInt(1))) {
            return true; // proabably a composite
        }
        if (y.equals(randNum.minus(1))) {
            return false; // proabably a prime
        }
    }
    return true; // probably a composite
}

module.exports = {

    rabinMillerPrimeTest: async (randNum, iterations) => {
        try {

            //# Initial check to determine whether the given number is prime or not
            if (randNum.equals(2) || randNum.equals(3)) {
                return true;
            }

            //# determine whether number in less than 1 or even
            if (randNum.lesserOrEquals(1) || randNum.mod(2).equals(0)) {
                return false;
            }

            /*
                Based on official formula of Rabin Miller test algorithm to fetch components defined below as const.
                Visit official documentation of Rabin Miller Test Algorithm to understand in depth.
            */

            //# randNum−1=oddNumFromN×2pow(exponentOf2)    
            let exponentOf2 = 0; // initialized to 0, indicating the initial exponent of 2 in the factorization of randNum−1.
            let oddNumber = randNum.minus(1); //odd number of randNum-1 

            while (oddNumber.mod(2).equals(0)) { // check oddNumber is true or not; repeat the process unles oddNumber is odd
                oddNumber = oddNumber.divide(2);
                exponentOf2++; // increase exponentOf2 based for each iteration until an odd number is fetched. 
            }

            for (let k = 0; k < iterations; k++) {

                const num = bigInt.randBetween(2, randNum.minus(2));
                if (await isWitness(num, randNum, oddNumber, exponentOf2)) {
                    return false; // is not prime number
                }
            }
            return true; // is prime
        }
        catch (error) {
            throw new Error(`Failed Rabin Miller Prime Test process! ${error}`);
        }
    }
}