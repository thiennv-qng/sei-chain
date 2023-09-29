import { Point } from "@noble/secp256k1";
import { keccak_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";

export const toEvmAddress = (pubkey: Uint8Array) => {
  try {
    const point = Point.fromHex(pubkey);
    const pub = point.toRawBytes().subarray(1);
    const hash = bytesToHex(keccak_256(pub).slice(-20));
    const address = `0x${hash}`;
    return address;
  } catch (er) {
    return "";
  }
};
