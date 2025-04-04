"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"

interface MetaMaskConnectorProps {
  onConnection: (connected: boolean) => void
}

export function MetaMaskConnector({ onConnection }: MetaMaskConnectorProps) {
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    checkConnection()
  }, [])

  async function checkConnection() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          onConnection(true)
        }
      } catch (error) {
        console.error("Failed to get accounts", error)
      }
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.BrowserProvider(window.ethereum) // ✅ Fixed for Ethers v6
        const signer = await provider.getSigner() // ✅ Fix: Await getSigner()
        const address = await signer.getAddress()
        setAccount(address)
        onConnection(true)
      } catch (error) {
        console.error("Failed to connect to MetaMask", error)
      }
    } else {
      alert("Please install MetaMask to use this feature")
    }
  }

  return (
    <div>
      {account ? (
        <p className="text-[10px] text-muted-foreground">Connected: {account}</p>
      ) : (
        <Button onClick={connectWallet}>Connect MetaMask</Button>
      )}
    </div>
  )
}
