import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search, ClipboardList, User } from "lucide-react"

export default function PatientDashboard() {
  return (
    <DashboardLayout role="Patient">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Welcome, Patient</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center text-blue-700">
                <Search className="mr-2 h-5 w-5" /> 
                Verify Prescription
              </CardTitle>
              <CardDescription>Check the validity of a prescription</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/patient-dashboard/verify-prescription" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="mr-2 h-4 w-4" /> Verify Prescription
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-t-4 border-t-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center text-green-700">
                <ClipboardList className="mr-2 h-5 w-5" />
                Prescription History
              </CardTitle>
              <CardDescription>View your prescription history</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/patient-dashboard/prescription-history" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <ClipboardList className="mr-2 h-4 w-4" /> View History
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-t-4 border-t-purple-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center text-purple-700">
                <User className="mr-2 h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>Manage your patient profile</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/patient-dashboard/profile" className="block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <User className="mr-2 h-4 w-4" /> Manage Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}