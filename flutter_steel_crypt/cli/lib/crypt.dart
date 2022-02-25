//This Source Code Form is subject to the terms of the Mozilla Public
//License, v. 2.0. If a copy of the MPL was not distributed with this
//file, You can obtain one at https://mozilla.org/MPL/2.0/.

// © 2019 Aditya Kishore

import 'package:steel_crypt/steel_crypt.dart';
import 'dart:convert';
import 'package:crypto/crypto.dart';

void main() {
  // Generate keys/ivs/nonces
  // --------
  // Key generator
  var keyGen = CryptKey();
  //generate 32 byte key using Fortuna
  // var key32 = keyGen.genFortuna(len: 32);
  //generate 16 byte key using Fortuna
  // var key16 = keyGen.genFortuna(len: 16);
  var key16 = 'Cz1V2N1wt8kkSUbwLtBY76WV2cJQI8oQ3BefevIjSOo=';
  //generate iv for AES
  var iv16 = keyGen.genDart(len: 16);
  //generate iv for ChaCha20
  // var iv8 = keyGen.genDart(len: 8);

  // Generate cryptography machines
  // --------
  // generated AES encrypter with key + padding
  var aes = AesCrypt(key: key16, padding: PaddingAES.pkcs7);
  var password = 'tw273634';
  const CIPHER_KEY = 'tw273634';
  var hmacSha256 = new Hmac(sha256, utf8.encode(CIPHER_KEY)); // HMAC-SHA256
  var digest = hmacSha256.convert(utf8.encode(password));
  print('Global.cipher.credential');
  print(digest.toString());
  print('Global.cipher.encryptKey');
  print(base64.encode(digest.bytes));

  // Examples + Debugging
  // --------
  //Print key
  print('Keys:');
  print('key16: $key16');
  print('');

  //Print IV
  print('IVs:');
  print('For AES/SCrypt: $iv16 ');
  print('');

  //AES GCM encryption/decryption
  print('AES Symmetric GCM:');
  var crypted = aes.gcm.encrypt(inp: 'words', iv: iv16); //encrypt
  print(crypted);
  // crypted =
  //     '7b2270617373776f7264223a224a4d4d2f5255693757432b6854673243594d352f42724c6f5971696f794e6d67334663714e51557830396432486e41384264563230316836776172574f654a5367627a6e6646784b6d664e76774e745738793244327132712b64572f31674c414d75473059565364776e76584442566946465a4a43765835706857634b64394c663056457736703338746567735072305270655a4663696e4e4a774d514c4a6f4f4d686f4b75786d316c4b7746356c755a78624e394132463931575273484f4241784730697a6d526e775a57564155513231625248434944334937704f62304b38486454504f706258356a534f6a6b79444372757059566479484a7067334e48222c226976223a22665a51555a624871786f645359464f616455387773413d3d227d';
  print(aes.gcm.decrypt(enc: crypted, iv: iv16)); //decrypt
  print('');
  // generate ChaCha20/12 encrypter
  // var stream = LightCrypt(key: key32, algo: StreamAlgo.chacha20_12);
  // // generate Blake2b hasher
  // var hasher = HashCrypt(algo: HashAlgo.Blake2b);
  // // CMAC AES CBC Hasher
  // var mac = MacCrypt(key: key16, type: MacType.CMAC);
  // // generate scrypt password hasher
  // var passHash = PassCrypt.scrypt();

  //SHA-3 512 Hash
  // print('SHA-3 512 Hash:');
  // var hash = hasher.hash(inp: 'example'); //perform hash
  // print(hash);
  // print(hasher.check(plain: 'example', hashed: hash)); //perform check
  // print('');

  //CMAC AES CBC Hash
  // print('CMAC AES CBC Hash:');
  // var hash2 = mac.process(inp: 'words'); //perform hash
  // print(hash2);
  // print(mac.check(plain: 'words', hashed: hash2)); //perform check
  // print('');

  //Password (scrypt)
  // print('Password hash (scrypt):');
  // var hash3 = passHash.hash(salt: iv16, inp: 'words'); //perform hash
  // print(hash3);
  // print(passHash.check(
  //     salt: iv16, plain: 'words', hashed: hash3)); //perform check
  // print('');

  //12-Round ChaCha20; Symmetric stream cipher
  // print('ChaCha20 Symmetric:');
  // var crypted3 = stream.encrypt(inp: 'broken', iv: iv8); //encrypt
  // print(crypted3);
  // print(stream.decrypt(enc: crypted3, iv: iv8)); //decrypt
  // print('');

  //AES CTR; Symmetric stream cipher
  // print('AES Symmetric CTR:');
  // var crypted2 = aes.ctr.encrypt(inp: 'words', iv: iv16); //Encrypt.
  // print(crypted2);
  // print(aes.ctr.decrypt(enc: crypted2, iv: iv16)); //Decrypt.
  // print('');
}
