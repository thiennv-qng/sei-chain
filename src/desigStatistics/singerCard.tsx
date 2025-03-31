import Space from "./space";
import { CalendarPlus, ClipboardEdit } from "lucide-react";

import { DATE_FORMAT, SignerData } from "./interface";
import dayjs from "dayjs";

export default function SingerCard({ signer }: { signer: SignerData }) {
  return (
    <div
      className={`rounded-lg p-3 ${
        signer.activated ? "bg-green-300" : "bg-gray-200 opacity-40"
      }`}
    >
      <div className="flex flex-col gap-1">
        <Space>
          <Space>
            <CalendarPlus size={12} />
            <span className="caption whitespace-nowrap">Create at</span>
          </Space>
          <span className="caption text-secondary">
            {dayjs(signer.createdAt).format(DATE_FORMAT)}
          </span>
        </Space>

        <Space>
          <Space>
            <ClipboardEdit size={12} />
            <span className="caption  whitespace-nowrap">Update at</span>
          </Space>
          <span className="caption text-secondary">
            {dayjs(signer.updatedAt).format(DATE_FORMAT)}
          </span>
        </Space>
      </div>
    </div>
  );
}
