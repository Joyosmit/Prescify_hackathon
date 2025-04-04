"use client";

declare global {
  interface Window {
    ethereum?: any;
  }
}

import { ethers, keccak256 } from "ethers";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus, X } from "lucide-react";
import contractABI from "../lib/HealthChainAbi.json"; // Ensure correct path
import { createJsonFile } from "@/lib/convertToFile";
import upload from "@/lib/uploadToIPFS";
import QRGenerator from "./qr-code";
import { CONTRACT_ADDRESS } from "@/lib/contractAddress";

// const CONTRACT_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"; // Update with deployed contract address
const CONTROLLED_DRUGS = [
  "Morphine",
  "Oxycodone",
  "Fentanyl",
  "Adderall",
  "Ritalin",
];

interface Medication {
  name: string
  dosage: string
}

export function PrescriptionForm() {
  const [patientName, setPatientName] = useState("");
  const [medications, setMedications] = useState<Medication[]>([{ name: "", dosage: "" }])


  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [fmtStr, setFmtStr] = useState("");

  const handleMedicationChange = (value: string) => {
    setMedication(value);
    setShowWarning(CONTROLLED_DRUGS.includes(value));
  };


  const handleMultiMedicationChange = (index: number, field: "name" | "dosage", value: string) => {
    const updatedMedications = [...medications]
    updatedMedications[index][field] = value

    // updatedMedications.sort((a, b) => a.name.localeCompare(b.name));

    setMedications(updatedMedications)
    setShowWarning(updatedMedications.some((med) => CONTROLLED_DRUGS.includes(med.name)))
    console.log("This is updated medications: ", updatedMedications);
  }

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "" }])
  }

  const removeMedication = (index: number) => {
    const updatedMedications = medications.filter((_, i) => i !== index)
    setMedications(updatedMedications)
    setShowWarning(updatedMedications.some((med) => CONTROLLED_DRUGS.includes(med.name)))
  }
  // Generate patient DID (Decentralized Identifier)
  const generatePatientDID = (name: string) => {
    return `did:patient:${ethers.keccak256(
      ethers.toUtf8Bytes(name + Date.now())
    )}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTransactionHash(null);

    if (!window.ethereum) {
      setError("Metamask is required to issue a prescription.");
      setLoading(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI.abi,
        signer
      );
     
      // medications.sort();
      // medications.sort((a, b) => a.name.localeCompare(b.name));
      console.log("This is medications before sorting new: ", medications);
      medications.sort((a, b) => a.name < b.name ? -1 : 1);

      console.log("This is medications after sorting new: ", medications);
      let formattedString = medications.map((med) => `${med.name.trim().toLowerCase()}.${med.dosage.trim().toLowerCase()}`).join(".");
      formattedString += `.${patientAddress.trim().toLowerCase()}`;

      console.log("This is formatted string: ", formattedString);
      
      const prescriptionHash = keccak256(Buffer.from(formattedString));
      const prescriptionData = {
        patientHash: keccak256(Buffer.from(patientAddress)),
        doctorAddress: await signer.getAddress(),
        prescriptionHash
      };
      
      const jsonBlob = new Blob([JSON.stringify(prescriptionData, null, 2)], {
        type: "application/json",
      });
      const jsonFile = new File([jsonBlob], "prescription.json", {
        type: "application/json",
      });

      const data = new FormData();
      data.set("file", jsonFile);

      const ipfsHash = await upload(jsonFile);
      
      const tx = await contract.isDoctorVerified(await signer.getAddress());
      
      // await tx.wait();
      // setTransactionHash(tx.hash);
      setFmtStr(formattedString);
      setMedications([]);
      formattedString = "";
      console.log("This is hash: ", tx);
      if (!tx) {
        setError("Doctor is not verified");
        setLoading(false);
        return;
      }
      const tx2 = await contract.issuePrescription(keccak256(Buffer.from(patientAddress.trim())).trim(), ipfsHash);
    } catch (err) {
      console.error("Transaction failed", err);
      setError("Failed to issue prescription. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="patientName">Patient Name</Label>
        <Input
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="patientAddress">Patient Address</Label>
        <Input
          id="patientAddress"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          required
        />
      </div>
      {medications.map((medication, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Medication {index + 1}</Label>
            {index > 0 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => removeMedication(index)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Select onValueChange={(value) => handleMultiMedicationChange(index, "name", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select medication" />
            </SelectTrigger>
            <SelectContent>
              {["Aspirin", "Ibuprofen", "Paracetamol", ...CONTROLLED_DRUGS].map((med) => (
                <SelectItem key={med} value={med}>
                  {med}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Dosage"
            value={medication.dosage}
            onChange={(e) => handleMultiMedicationChange(index, "dosage", e.target.value)}
            required
          />
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addMedication}>
        <Plus className="mr-2 h-4 w-4" /> Add Medication
      </Button>
      {/* <div>
        <Label htmlFor="medication">Medication</Label>
        <Select onValueChange={handleMedicationChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Select medication" />
          </SelectTrigger>
          <SelectContent>
            {["Aspirin", "Ibuprofen", "Paracetamol", ...CONTROLLED_DRUGS].map(
              (med) => (
                <SelectItem key={med} value={med}>
                  {med}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="dosage">Dosage</Label>
        <Input
          id="dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          required
        />
      </div> */}

      {showWarning && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This medication is a controlled substance. Please confirm before
            prescribing.
          </AlertDescription>
        </Alert>
      )}

      {transactionHash && (
        <Alert
          variant="default"
          className="bg-green-100 border-green-500 text-green-800"
        >
          <AlertTitle>Transaction Successful!</AlertTitle>
          <AlertDescription>
            Prescription recorded on blockchain. Tx Hash:{" "}
            <a
              href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {transactionHash}
            </a>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Issue Prescription"}
      </Button>
      <QRGenerator getValue={() => fmtStr} />

    </form>
  );
}




