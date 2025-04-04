"use client";

import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../lib/HealthChainAbi.json"; // Ensure correct path
import upload from "@/lib/uploadToIPFS";
import { CONTRACT_ADDRESS } from "@/lib/contractAddress";

interface DoctorDetails {
  name: string;
  specialization: string;
  licenseNumber: string;
  experience: string;
  hospital: string;
  location: string;
  contact: string;
}

export default function RegisterDoctor() {
  const [doctor, setDoctor] = useState<DoctorDetails>({ 
    name: "", 
    specialization: "", 
    licenseNumber: "", 
    experience: "", 
    hospital: "", 
    location: "", 
    contact: "" 
  });
  const [uploading, setUploading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [txHash, setTxHash] = useState("");

  const [prescriptionId, setPrescriptionId] = useState("");
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      setUploading(true);

      // Upload doctor details to IPFS using your existing function
      const jsonBlob = new Blob([JSON.stringify(doctor, null, 2)], {
        type: "application/json",
      });
      const jsonFile = new File([jsonBlob], "doctor.json", {
        type: "application/json",
      });

      const data = new FormData();
      data.set("file", jsonFile);

      const ipfsHash = await upload(jsonFile);
      console.log("Uploaded to IPFS:", ipfsHash);

      setUploading(false);
      setRegistering(true);

      // Connect to MetaMask
      if (!window.ethereum) throw new Error("MetaMask is not installed");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Contract instance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

      // Call the registerDoctor function with IPFS hash
      const tx = await contract.registerDoctor(ipfsHash);
      console.log("Transaction Hash of Doctor:", tx);
      setTxHash(tx.hash);

      console.log("Doctor registered, fetching details...");

      // Fetch doctor details
      const doctorDetailsOnChain = await contract.doctors(await signer.getAddress());

      console.log("Doctor Details from Contract:", doctorDetailsOnChain);
    } catch (error) {
      console.error("Error registering doctor:", error);
    } finally {
      setUploading(false);
      setRegistering(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5 border rounded-lg shadow-md w-96">
      <h2 className="text-xl font-bold">Register as a Doctor</h2>
      <input type="text" name="name" placeholder="Name" value={doctor.name} onChange={handleChange} className="p-2 border rounded" />
      <input type="text" name="specialization" placeholder="Specialization" value={doctor.specialization} onChange={handleChange} className="p-2 border rounded" />
      <input type="text" name="licenseNumber" placeholder="License Number" value={doctor.licenseNumber} onChange={handleChange} className="p-2 border rounded" />
      <input type="text" name="experience" placeholder="Years of Experience" value={doctor.experience} onChange={handleChange} className="p-2 border rounded" />
      <input type="text" name="hospital" placeholder="Hospital Affiliation" value={doctor.hospital} onChange={handleChange} className="p-2 border rounded" />
      <input type="text" name="location" placeholder="Location" value={doctor.location} onChange={handleChange} className="p-2 border rounded" />
      <input type="text" name="contact" placeholder="Contact Info" value={doctor.contact} onChange={handleChange} className="p-2 border rounded" />
      <button onClick={handleRegister} disabled={uploading || registering} className="p-2 bg-blue-500 text-white rounded">
        {uploading ? "Uploading..." : registering ? "Registering..." : "Register"}
      </button>
      {txHash && <p className="text-green-500">Transaction: <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>}
    </div>
  );
}
