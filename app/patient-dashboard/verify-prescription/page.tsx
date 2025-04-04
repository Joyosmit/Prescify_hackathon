import { DashboardLayout } from "@/components/dashboard-layout"
import { PrescriptionVerifier } from "@/components/prescription-verifier"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function VerifyPrescription() {
  return (
    <DashboardLayout role="Patient">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Verify Prescription</h2>
          <p className="text-muted-foreground mt-1">Confirm the authenticity of your prescription</p>
        </div>
        
        <Card className="shadow-sm">
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center text-gray-700">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              Prescription Verification
            </CardTitle>
            <CardDescription>Enter your prescription details to verify authenticity</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <PrescriptionVerifier />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}