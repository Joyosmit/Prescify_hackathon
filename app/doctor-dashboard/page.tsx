import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FileText, Users, ClipboardList } from "lucide-react"

export default function DoctorDashboard() {
  return (
    <DashboardLayout role="Doctor">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Welcome, Doctor</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center text-blue-700">
                <FileText className="mr-2 h-5 w-5" /> 
                Issue Prescription
              </CardTitle>
              <CardDescription>Create a new prescription for a patient</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/doctor-dashboard/issue-prescription" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <FileText className="mr-2 h-4 w-4" /> Issue Prescription
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-t-4 border-t-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center text-green-700">
                <ClipboardList className="mr-2 h-5 w-5" />
                Register Yourself
              </CardTitle>
              <CardDescription>Register yourself as a doctor on our system!</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/doctor-dashboard/register-yourself" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <ClipboardList className="mr-2 h-4 w-4" /> Get Registered
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}