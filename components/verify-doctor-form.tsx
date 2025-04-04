// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { AlertCircle, CheckCircle } from "lucide-react"

// export function VerifyDoctorForm() {
//   const [licenseNumber, setLicenseNumber] = useState("")
//   const [verificationResult, setVerificationResult] = useState<"verified" | "unverified" | null>(null)

//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     const isVerified = Math.random() > 0.5
//     setVerificationResult(isVerified ? "verified" : "unverified")
//   }

//   return (
//     <form onSubmit={handleVerify} className="space-y-4">
//       <div>
//         <Label htmlFor="licenseNumber">Medical License Number</Label>
//         <Input
//           id="licenseNumber"
//           value={licenseNumber}
//           onChange={(e) => setLicenseNumber(e.target.value)}
//           placeholder="Enter your medical license number"
//           required
//         />
//       </div>
//       <Button type="submit">Verify</Button>
//       {verificationResult && (
//         <Alert variant={verificationResult === "verified" ? "default" : "destructive"}>
//           {verificationResult === "verified" ? (
//             <CheckCircle className="h-4 w-4" />
//           ) : (
//             <AlertCircle className="h-4 w-4" />
//           )}
//           <AlertTitle>
//             {verificationResult === "verified" ? "Verification Successful" : "Verification Failed"}
//           </AlertTitle>
//           <AlertDescription>
//             {verificationResult === "verified"
//               ? "Your medical license has been verified. You can now issue prescriptions."
//               : "We couldn't verify your medical license. Please check the number and try again, or contact support."}
//           </AlertDescription>
//         </Alert>
//       )}
//     </form>
//   )
// }




"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { CONTRACT_ADDRESS } from "@/lib/contractAddress"
import contractABI from "../lib/HealthChainAbi.json"
import { getFile } from "@/lib/getFromIPFS"
// Contract details
// const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS"


export function VerifyDoctorForm() {
  const [licenseNumber, setLicenseNumber] = useState("")
  const [verificationResult, setVerificationResult] = useState<"verified" | "unverified" | null>(null)
  const [ipfsHash, setIpfsHash] = useState("")

  // useEffect(() => {
  //   fetchDoctorVerifierList()
  // }, [])

  const fetchDoctorVerifierList = async () => {
    if (!window.ethereum) {
      console.error("Ethereum provider not found")
      return
    }

    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Contract instance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
      const hash = await contract.getDoctorVerifierList()
      setIpfsHash(hash)
    } catch (error) {
      console.error("Error fetching doctor verifier list:", error)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    fetchDoctorVerifierList()
    const data = await getFile(ipfsHash);
    console.log("This is verifier data: ", data);
    // Placeholder verification logic
    // const isVerified = Math.random() > 0.5
    // setVerificationResult(isVerified ? "verified" : "unverified")
  }

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <div>
        <Label htmlFor="licenseNumber">Medical License Number</Label>
        <Input
          id="licenseNumber"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          placeholder="Enter your medical license number"
          required
        />
      </div>

      <Button type="submit">Verify</Button>

      {ipfsHash && (
        <Alert variant="default">
          <AlertTitle>Doctor Verifier List</AlertTitle>
          <AlertDescription>IPFS Hash: {ipfsHash}</AlertDescription>
        </Alert>
      )}

      {verificationResult && (
        <Alert variant={verificationResult === "verified" ? "default" : "destructive"}>
          {verificationResult === "verified" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {verificationResult === "verified" ? "Verification Successful" : "Verification Failed"}
          </AlertTitle>
          <AlertDescription>
            {verificationResult === "verified"
              ? "Your medical license has been verified. You can now issue prescriptions."
              : "We couldn't verify your medical license. Please check the number and try again, or contact support."}
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}
