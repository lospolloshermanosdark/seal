"use client";

import { useState } from "react";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export default function SectorItem({ id, title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sector-item">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>

        <button
          onClick={() => setOpen(!open)}
          className="viewMore flex items-center gap-2"
        >
          <i
            className={`fa ${
              open ? "fa-caret-down" : "fa-caret-right"
            }`}
          />
        </button>
      </div>

      {/* COLLAPSE */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] mt-3" : "max-h-0"
        }`}
      >
        <div className="bg-gray-200 p-4 rounded-xl">{children}</div>
      </div>
    </div>
  );
}