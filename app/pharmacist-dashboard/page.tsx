import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Pill, ClipboardList, User } from "lucide-react"

export default function PharmacistDashboard() {
  return (
    <DashboardLayout role="Pharmacist">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome, Pharmacist</h2>
            <p className="text-gray-600">Manage prescriptions and registrations</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-500" />
                <CardTitle>Verify Prescription</CardTitle>
              </div>
              <CardDescription>Verify a prescription, then dispense it if valid</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-500 mb-4">Review patient prescriptions and approve valid ones for dispensing.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/pharmacist-dashboard/verify-prescription" className="w-full">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Verify Prescription
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-green-500" />
                <CardTitle>Dispense Medication</CardTitle>
              </div>
              <CardDescription>Record dispensed medications</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-500 mb-4">Track and record all medications dispensed to patients.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/pharmacist-dashboard/dispense-medication" className="w-full">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Dispense Medication
                </Button>
              </Link>
            </CardFooter>
          </Card> */}
          
          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-purple-500" />
                <CardTitle>Register Yourself</CardTitle>
              </div>
              <CardDescription>Get registered as a pharmacist</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-500 mb-4">Complete your registration to gain full access to the pharmacy system.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/pharmacist-dashboard/register-pharmacist" className="w-full">
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  Register As Pharmacist
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}