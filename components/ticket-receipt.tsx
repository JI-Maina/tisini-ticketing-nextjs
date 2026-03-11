"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const TICKET_IMAGE_PATH = "/daystar-v-kcb-event.jpeg";

type TicketReceiptProps = {
  ticket: Ticket;
};

export function TicketReceipt({ ticket }: TicketReceiptProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const ticketCode = ticket.TicketNo ?? ticket.ticket_code;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `ticket-${ticketCode}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <div
        ref={cardRef}
        className="flex w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
      >
        <div
          className="relative w-[55%] shrink-0 bg-gray-100"
          style={{ aspectRatio: "1" }}
        >
          <Image
            src={TICKET_IMAGE_PATH}
            alt="Event"
            fill
            className="object-cover"
            sizes="220px"
          />
        </div>
        <div className="flex w-[45%] flex-col items-center justify-center gap-2 bg-gray-50 px-3 py-3 shrink-0">
          <p className="font-mono text-xs font-semibold text-dark-blue text-center break-all leading-tight">
            {ticketCode}
          </p>
          <QRCodeSVG
            value={ticketCode}
            size={140}
            level="M"
            includeMargin
            className="shrink-0"
            title={`Ticket ${ticketCode}`}
          />
        </div>
      </div>

      <Button
        type="button"
        size="sm"
        className="w-full rounded-full"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        <Download className="w-4 h-4 mr-2" />
        {isDownloading ? "Downloading…" : "Download ticket"}
      </Button>
    </div>
  );
}
