"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import upload from "@/lib/uploadToIPFS"
import { ethers } from "ethers"
import { CONTRACT_ADDRESS } from "@/lib/contractAddress"
import contractABI from "../lib/HealthChainAbi.json"
interface RegistrationFormProps {
  role: "Doctor" | "Pharmacist"
}

export function RegistrationForm({ role }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    specialization: "",
    yearsOfExperience: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    additionalInfo: "",
  })
  const [registrationResult, setRegistrationResult] = useState<"success" | "error" | null>(null)
  const [uploading, setUploading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [registering, setRegistering] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the registration data to your backend or blockchain
    console.log("Registration submitted:", formData)
    // Simulate a registration result
    setRegistrationResult(Math.random() > 0.5 ? "success" : "error")
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setUploading(true);

      // Upload doctor details to IPFS using your existing function
      const jsonBlob = new Blob([JSON.stringify(formData, null, 2)], {
        type: "application/json",
      });
      const jsonFile = new File([jsonBlob], "prescription.json", {
        type: "application/json",
      });

      const data = new FormData();
      data.set("file", jsonFile);

      const ipfsHash = await upload(jsonFile)
    //   const ipfsHash = await upload(doctor);
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
      const tx = await contract.registerPharmacist(ipfsHash);
      // await tx.wait();

      console.log("Transaction Hash of Pharmacist:", tx);
      setTxHash(tx.hash);

      console.log("Pharmacist registered, fetching details...");

      // Fetch pharmacist details
      const pharmacistDetailsOnChain = await contract.pharmacists(await signer.getAddress());

      console.log("Doctor Details from Contract:", pharmacistDetailsOnChain);
    } catch (error) {
      console.error("Error registering doctor:", error);
    } finally {
      setUploading(false);
      setRegistering(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="licenseNumber">{role} License Number</Label>
          <Input
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="specialization">Specialization</Label>
          <Select onValueChange={(value) => handleSelectChange("specialization", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              {role === "Doctor" ? (
                <>
                  <SelectItem value="general">General Practice</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="retail">Retail Pharmacy</SelectItem>
                  <SelectItem value="hospital">Hospital Pharmacy</SelectItem>
                  <SelectItem value="clinical">Clinical Pharmacy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Input
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
        </div>
      </div>
      <div>
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleInputChange}
          rows={4}
        />
      </div>
      <Button type="submit" className="w-full">
        Register
      </Button>
      {registrationResult && (
        <Alert variant={registrationResult === "success" ? "default" : "destructive"}>
          {registrationResult === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>
            {registrationResult === "success" ? "Registration Successful" : "Registration Failed"}
          </AlertTitle>
          <AlertDescription>
            {registrationResult === "success"
              ? `Your ${role.toLowerCase()} account has been created successfully. Please wait for approval.`
              : "There was an error during registration. Please try again or contact support."}
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}