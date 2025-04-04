import { DashboardLayout } from "@/components/dashboard-layout"
import { PharmacistVerificationForm } from "@/components/verify-pharmacist-form"
import { ShieldCheck } from "lucide-react"

export default function VerifyYourself() {
  return (
    <DashboardLayout role="Verifier">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-purple-100 p-2 rounded-full">
            <ShieldCheck className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Verify Pharmacist</h2>
            <p className="text-sm text-gray-600">Approve pharmacist credentials and registration</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="mb-4">
            <p className="text-gray-600">
              Review pharmacist information and validate credentials before approval
            </p>
          </div>
          
          <div className="mt-6">
            <PharmacistVerificationForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}