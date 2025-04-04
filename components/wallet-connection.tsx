"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RoleSelection } from "@/components/role-selection"
import { MetaMaskConnector } from "@/components/metamask-connector"
import { Wallet, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function WalletConnection() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleWalletConnection = (connected: boolean) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsWalletConnected(connected)
      setIsLoading(false)
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md border-0 shadow-xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500" />
        
        <CardHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-950">
                <Wallet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Connect Wallet</CardTitle>
            </div>
            {isWalletConnected && (
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-xs font-medium">Connected</span>
              </div>
            )}
          </div>
          <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
            Secure access to decentralized applications
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 pb-4">
          <div className={cn(
            "transition-all duration-300 ease-in-out rounded-xl overflow-hidden",
            isWalletConnected ? "opacity-50" : "opacity-100",
            "ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-indigo-200 dark:hover:ring-indigo-900 hover:shadow-md"
          )}>
            <MetaMaskConnector onConnection={handleWalletConnection} />
          </div>
        </CardContent>
        
        {isWalletConnected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <CardFooter className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="w-full space-y-4">
                <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Select your role to continue
                </h3>
                <div className="p-4 bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                  <RoleSelection />
                </div>
              </div>
            </CardFooter>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}