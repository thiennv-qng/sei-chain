import dayjs from "dayjs";

import {
  CalendarPlus,
  HeartHandshake,
  ClipboardEdit,
  ReplaceAll,
  FileSignature,
  SquareDashedBottomCode,
  FileLock2,
} from "lucide-react";
import Space from "./space";

import { DATE_FORMAT, MultiSigData } from "./interface";
import SingerCard from "./singerCard";

export default function MultiSigCard({ multiSig }: { multiSig: MultiSigData }) {
  return (
    <div className="flex flex-col p-4 bg-orange-100 rounded-md gap-4">
      <div className="flex flex-col gap-1">
        <Space className="justify-between">
          <Space>
            <FileSignature size={12} />
            <span className="caption">Creator</span>
          </Space>
          <span className="caption text-secondary text-ellipsis overflow-hidden max-w-[50px]">
            {multiSig.creator}
          </span>
        </Space>
        <Space className="justify-between">
          <Space>
            <SquareDashedBottomCode size={12} />
            <span className="caption">ID</span>
          </Space>
          <span className="caption text-secondary text-ellipsis overflow-hidden max-w-[50px]">
            {multiSig.id}
          </span>
        </Space>
        <Space className="justify-between">
          <Space>
            <FileLock2 size={12} />
            <span className="caption">ZK Proof</span>
          </Space>
          <span className="caption text-secondary text-ellipsis overflow-hidden max-w-[50px]">
            {multiSig.zkp}
          </span>
        </Space>
      </div>

      <div className="divide-x h-[1px] bg-[#dadada]" />

      <div className="flex flex-col gap-1">
        <Space className="justify-between">
          <Space>
            <HeartHandshake size={12} />
            <span className="caption">Threshold</span>
          </Space>
          <span className="caption text-secondary">
            {multiSig.t}/{multiSig.n}
          </span>
        </Space>

        <Space className="justify-between">
          <Space>
            <CalendarPlus size={12} />
            <span className="caption">Create at</span>
          </Space>
          <span className="caption text-secondary">
            {dayjs(multiSig.createdAt).format(DATE_FORMAT)}
          </span>
        </Space>

        <Space className="justify-between">
          <Space>
            <ClipboardEdit size={12} />
            <span className="caption">Update at</span>
          </Space>
          <span className="caption text-secondary">
            {dayjs(multiSig.updatedAt).format(DATE_FORMAT)}
          </span>
        </Space>
        <Space className="justify-between">
          <Space>
            <ReplaceAll size={12} />
            <span className="caption">Curve</span>
          </Space>
          <span className="caption text-secondary">{multiSig.curve}</span>
        </Space>
      </div>

      <div className="divide-x h-[1px] bg-[#dadada]" />

      <div className="flex flex-col gap-2">
        <p className="caption font-bold">Signers</p>
        <div className="grid grid-cols-1 gap-2">
          {multiSig.signers.map((signer) => (
            <SingerCard signer={signer} key={signer.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
