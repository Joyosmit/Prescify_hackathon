import { DashboardLayout } from "@/components/dashboard-layout"
import { DoctorVerificationForm } from "@/components/doctor-verification"
import { UserCheck } from "lucide-react"

export default function VerifyDoctor() {
  return (
    <DashboardLayout role="Verifier">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-100 p-2 rounded-full">
            <UserCheck className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Register a Doctor</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="mb-4">
            <p className="text-gray-600">
              Review and verify doctor credentials before approval
            </p>
          </div>
          
          <div className="mt-4">
            <DoctorVerificationForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}