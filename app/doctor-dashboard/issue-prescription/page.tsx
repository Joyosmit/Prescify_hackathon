// @ts-nocheck
import { DashboardLayout } from "@/components/dashboard-layout"
import { PrescriptionForm } from "@/components/prescription-form"
import { MetaMaskConnector } from "@/components/metamask-connector"
import { Card, CardContent } from "@/components/ui/card"

export default function IssuePrescription() {
  return (
    <DashboardLayout role="Doctor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">📝 Issue Prescription</h2>
        </div>

        <Card className="shadow-md rounded-2xl p-4 bg-white dark:bg-gray-900 transition-all">
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              🔗 Connect Your Wallet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connect your MetaMask wallet to sign and verify prescriptions on the blockchain.
            </p>
            {/* export function MetaMaskConnector({ onConnection }: MetaMaskConnectorProps) { */}
            
            <MetaMaskConnector />
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl p-4 bg-white dark:bg-gray-900 transition-all">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              📄 Prescription Details
            </h3>
            <PrescriptionForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}