import { DashboardLayout } from "@/components/dashboard-layout"
import { PrescriptionVerifier } from "@/components/prescription-verifier"
import { ClipboardCheck } from "lucide-react"

export default function VerifyPrescription() {
  return (
    <DashboardLayout role="Pharmacist">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 p-2 rounded-full">
            <ClipboardCheck className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verify Prescription</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="mb-4">
            <p className="text-gray-600">
              Review and verify prescription details before approval
            </p>
          </div>
          
          <div className="mt-4">
            <PrescriptionVerifier />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}