# **Project Detail**

## **node-rsa-encryption-decryption**

NodeJS project for RSA Algorithm.

## **Description**

This project is written from scratch; implementing the RSA encryption and decryption algorithm. The mathematical formulas and logic has been written from scratch. It also generates the public and private keys .pem format files. This has been achieved using **node-forge** npm package.

## **The project**

1. Generates the RSA keys based on custom functions written from scratch.
2. Generates the .pem files using Node-forge package.
3. Reads the .pem files and generates the exponents and modulus required for encryption and decryption. Node-forge package is used for reading from .pem files.
4. Encrypts the message using the public key exponents.
5. Decrypts the encrypted message using the private key exponents.

## **Users are expected to have Knowledge of** 

- RSA algorithm.
- Assymetric encryption.
- Rabin Miller's primality Test algorithm.
- Concept of relative/co-prime.
- Modular and Modular Inverse functions
- Exponential functions.
- .pem format files.

*It's okay if you are a begineer, you can always go to official documentations and formulas for better understanding*

## **Code Stacks**

- nodeJs

## **Npm commands**


| Command                                 | Command Purpose                  | Parameter   |
| ----------------------------------------- | ---------------------------------- | ------------- |
| npm run generate-rsa-keys               | generate public and private keys | N/A         |
| npm run encrypt "messageToEncrypt"      | encrypts message                 | message     |
| npm run decrypt "encryptedMsgToDecrypt" | decrypts encrypted message       | encrytedMsg |

## **Important npm packages**

- **node-forge**
- **big-integer**
- **fs**

## **Use-Cases of this project**

### **You can refer this project**

1. to generate your custom rsa public and private keys
2. to encrypt the message based on custom encryption function
3. to decrypt the message based on custom decryption function
4. to get the idea of RSA Algorithm code-wise
5. to refer the code-base and generate your own custom RSA Algorithm project using your choice of programming language
