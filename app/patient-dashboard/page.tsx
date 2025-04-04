import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search, ClipboardList, User } from "lucide-react"

export default function PatientDashboard() {
  return (
    <DashboardLayout role="Patient">
      <h2 className="text-2xl font-semibold mb-6">Welcome, Patient</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Verify Prescription</CardTitle>
            <CardDescription>Check the validity of a prescription</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/patient-dashboard/verify-prescription">
              <Button className="w-full">
                <Search className="mr-2 h-4 w-4" /> Verify Prescription
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prescription History</CardTitle>
            <CardDescription>View your prescription history</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/patient-dashboard/prescription-history">
              <Button className="w-full">
                <ClipboardList className="mr-2 h-4 w-4" /> View History
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your patient profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/patient-dashboard/profile">
              <Button className="w-full">
                <User className="mr-2 h-4 w-4" /> Manage Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

