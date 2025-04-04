"use client";

import { useScanStore } from "@/lib/useScanStore";

export default function ScannedDataTable() {
  const { scannedData } = useScanStore();

  if (!scannedData || scannedData === "No QR code found.") {
    return <p className="text-center text-gray-500">No data available.</p>;
  }

  const dataParts = scannedData.split(".");
  if (dataParts.length < 3) return <p className="text-red-500">Invalid format</p>;

  const rows = [];
  for (let i = 0; i < dataParts.length - 1; i += 2) {
    rows.push({ med: dataParts[i], dosage: dataParts[i + 1] });
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Medicine</th>
            <th className="border border-gray-300 p-2">Dosage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{row.med}</td>
              <td className="border border-gray-300 p-2">{row.dosage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
