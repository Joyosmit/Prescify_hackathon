"use client";

import { useState } from "react";
import jsQR from "jsqr";
import { useScanStore } from "@/lib/useScanStore";

export default function QRImageScanner({ onScan }: { onScan?: (data: string) => void }) {
  // const [scannedData, setScannedData] = useState<string | null>(null);
  const { scannedData, setScannedData } = useScanStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Extract QR Code
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

        if (qrCode) {
          setScannedData(qrCode.data);
          if (onScan) onScan(qrCode.data);
        } else {
          setScannedData("No QR code found.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 sm:p-8 bg-green-100 text-black rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-lg sm:text-xl font-bold text-center">Upload QR Code Image</h2>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        className="p-2 border border-gray-400 rounded-md w-full max-w-xs sm:max-w-sm"
      />

      {scannedData && (
        <p className="text-sm sm:text-base text-gray-600 break-words text-center bg-white p-3 rounded-lg shadow-md w-full">
          <strong>Scanned Value:</strong> {scannedData}
        </p>
      )}
    </div>
  );
}
