import * as bech32 from "bech32";
import { ripemd160 as nobleRipemd160 } from "@noble/hashes/ripemd160";
import { sha256 as nobleSha256 } from "@noble/hashes/sha256";

/**
 *
 * @param pubkey Secp256k1 public key
 * @param prefix Chain name
 * @returns
 */
export const toCosmosAddress = (pubkey: Uint8Array, prefix: string): string => {
  try {
    const ripemd160 = nobleRipemd160.create();
    const sha256 = nobleSha256.create();

    const hashPubkey = sha256.update(pubkey).digest();
    const ripemdPubkey = ripemd160.update(hashPubkey).digest();

    return bech32.encode(prefix, bech32.toWords(ripemdPubkey), 0);
  } catch (er) {
    return "";
  }
};
