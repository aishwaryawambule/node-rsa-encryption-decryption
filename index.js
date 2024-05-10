const encryptDecrypt = require("./encrypt-decrypt");
const { generateRSAKeys } = require("./rsa/rsaComponents");
 
async function main() {
    await generateRSAKeys(2048);
}

async function encrypt(message) {
    const encryptedMessage = await encryptDecrypt.encryptMessage(message);
    console.log('encryptedMessage', encryptedMessage);
}

async function decrypt(encryptedMessage) {
    const decryptedMessage = await encryptDecrypt.decryptMessage(encryptedMessage);
    console.log('decryptedMessage', decryptedMessage);
}


if (process.argv[2] === 'main') {
    main();
}

if (process.argv[2] === 'encrypt') {
    encrypt(process.argv[3]);
}

if (process.argv[2] === 'decrypt') {
    decrypt(process.argv[3]);
}
