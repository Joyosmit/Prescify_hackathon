import { DashboardLayout } from "@/components/dashboard-layout"
import { RegistrationForm } from "@/components/registration-form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export default function PharmacistRegistration() {
  return (
    <DashboardLayout role="Pharmacist">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Pharmacist Registration</h2>
          <p className="text-muted-foreground mt-1">Complete your professional profile to access the system</p>
        </div>
        
        <Card className="shadow-sm border-l-4 border-l-orange-500">
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center text-gray-700">
              <UserPlus className="mr-2 h-5 w-5 text-orange-600" />
              Professional Information
            </CardTitle>
            <CardDescription>Please provide your credentials and professional details</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <RegistrationForm role="Pharmacist" />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}