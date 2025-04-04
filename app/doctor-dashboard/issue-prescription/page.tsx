import { DashboardLayout } from "@/components/dashboard-layout"
import { PrescriptionForm } from "@/components/prescription-form"
import { MetaMaskConnector } from "@/components/metamask-connector"

export default function IssuePrescription() {
  return (
    <DashboardLayout role="Doctor">
      <h2 className="text-2xl font-semibold mb-6">Issue Prescription</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
        <MetaMaskConnector />
      </div>
      <PrescriptionForm />
    </DashboardLayout>
  )
}

