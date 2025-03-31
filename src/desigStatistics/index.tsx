import { useCallback, useEffect, useState } from "react";
import Axios from "axios";

import MultiSigCard from "./multiSigCard";

import { MultiSigData } from "./interface";
import configs from "../configs";

import "./index.scss";

const { cluster } = configs;

const api = Axios.create({
  baseURL: cluster.http,
});

export default function DesigStatistic() {
  const [multiSigs, setMultiSigs] = useState<MultiSigData[]>([]);
  const getMultiSigs = useCallback(async () => {
    try {
      const { data } = await api.get("/multisig");
      setMultiSigs(data);
    } catch (er: any) {
      console.log(er.message);
      setMultiSigs([]);
    }
  }, []);

  useEffect(() => {
    getMultiSigs();
  }, [getMultiSigs]);

  return (
    <div className="flex flex-col gap-4 max-w-3xl rounded-xl shadow-xl my-8 mx-auto p-6">
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-2xl">Total Multisigs</h1>
        <p className="text-2xl font-bold">{multiSigs.length}</p>
      </div>
      <div className="divide-x-2 bg-slate-400 h-[1px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {multiSigs.map((multiSig) => (
          <MultiSigCard key={multiSig.id} multiSig={multiSig} />
        ))}
      </div>
    </div>
  );
}
