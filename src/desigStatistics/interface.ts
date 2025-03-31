export type Curve = "secp256k1" | "ed25519";

export type SignerData = {
  deletedAt: number;
  genesis: string;
  id: string;
  createdAt: number;
  owner: string;
  updatedAt: number;
  activated: boolean;
};

export type MultiSigData = {
  updatedAt: string;
  createdAt: number;
  gid: string;
  t: number;
  n: number;
  creator: string;
  id: string;
  curve: Curve;
  zkp: string;
  signers: SignerData[];
};

export const DATE_FORMAT = "DD/MM/YYYY - hh:mm";
