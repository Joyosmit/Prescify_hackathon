"use client";

declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import contractABI from "../lib/HealthChainAbi.json"; // Ensure correct path
import { CONTRACT_ADDRESS } from "@/lib/contractAddress";
import { getFile } from "@/lib/getFromIPFS";
// const CONTRACT_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"; // Update with deployed contract address


// ACTUALLY USED IN VERIFIER

export function PharmacistVerificationForm() {
  const [pharmacistAddress, setpharmacistAddress] = useState("");
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  
  const fetchDoctorVerification = async () => {
    setLoading(true);
    setError(null);
    setIpfsHash(null);

    if (!window.ethereum) {
      setError("Metamask is required to verify a doctor.");
      setLoading(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

      const doctor = await contract.pharmacists(pharmacistAddress);
      console.log("Fetched Pharmacist: ", doctor);

      const pharmacistVerifierIPFS = await contract.getPharmacyVerifierList();

      console.log("Pharmacist Verifier IPFS: ", pharmacistVerifierIPFS);
      const data = await getFile(pharmacistVerifierIPFS);
      console.log("This is my data: ", data);

      // @ts-ignore
      const verifierList = data?.split(",").map((addr) => addr.trim().toLowerCase());

    // Get signer’s address and check if it's in the verifier list
    const signerAddress = signer.address;
    console.log("Signer Address: ", signerAddress);

    if (!verifierList.includes(signerAddress.toLowerCase())) {
      setError("You are not authorized to verify doctors.");
      setLoading(false);
      return;
    }
    else{
      const tx = await contract.verifyPharmacist(pharmacistAddress);
    }

      // if(tx){
      //   console.log("Success YAYYYYYY")
      // }
      if (!doctor.exists) {
        setError("Doctor not found in the system.");
      } else {
        setIpfsHash(doctor.ipfsHash);
      }
    } catch (err) {
      console.error("Error fetching doctor details", err);
      setError("Failed to fetch doctor details. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="pharmacistAddress">Pharmacist Wallet Address</Label>
        <Input
          id="pharmacistAddress"
          value={pharmacistAddress}
          onChange={(e) => setpharmacistAddress(e.target.value)}
          required
        />
      </div>
      <Button onClick={fetchDoctorVerification} disabled={loading}>
        {loading ? "Verifying..." : "Verify Pharmacist"}
      </Button>

      {ipfsHash && (
        <Alert variant="default" className="bg-green-100 border-green-500 text-green-800">
          <AlertTitle>Doctor Verified</AlertTitle>
          <AlertDescription>
            Verification Details on IPFS: {" "}
            <a
              href={`https://ipfs.io/ipfs/${ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {ipfsHash}
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
    </div>
  );
}
