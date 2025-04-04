"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RoleSelection } from "@/components/role-selection"
import { MetaMaskConnector } from "@/components/metamask-connector"

export function WalletConnection() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const router = useRouter()

  const handleWalletConnection = (connected: boolean) => {
    setIsWalletConnected(connected)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Connect Your Wallet</CardTitle>
        <CardDescription>Connect your wallet to access the system</CardDescription>
      </CardHeader>
      <CardContent>
        <MetaMaskConnector onConnection={handleWalletConnection} />
      </CardContent>
      {isWalletConnected && (
        <CardFooter>
          <RoleSelection />
        </CardFooter>
      )}
    </Card>
  )
}

