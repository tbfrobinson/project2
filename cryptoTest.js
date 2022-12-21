// encryption is a two way process -- data is 'encrypted' using an algorithm and key
// you must know what the key is to decrypt or unscramble the data


// // use crypto-js for encryption
// const mySecret = 'Iceatccookiescforcbreakfast'

// const secretKey = 'pssword'

// // advanced encryption standard 
// const crypto = require('crypto-js')

// const myEncryption = crypto.AES.encrypt(String(100), secretKey)
// console.log(myEncryption.toString()) // lets see our encrypted data

// const decrypt = crypto.AES.decrypt(myEncryption.toString(), secretKey)
// console.log(decrypt.toString(crypto.enc.Utf8))

////////////////////////////////////////////
// passwords in the database will be hashed
// hashing is a one way process, once data has been hashed you cannot unhash it
// hashing functions always return a hash of equal length regardless of input
// hashing functions always return the same output given the same input
const bcrypt = require('bcrypt')

const userPassword = 'hunter12'
// when th euser signs up, we want to hash their password and save it in the db

const hashedPassword = bcrypt.hashSync(userPassword, 12)
console.log(hashedPassword)


// compare a string to our hash (user login)
console.log(bcrypt.compareSync(userPassword, hashedPassword))