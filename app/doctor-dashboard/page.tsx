import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FileText, Users, ClipboardList } from "lucide-react"

export default function DoctorDashboard() {
  return (
    <DashboardLayout role="Doctor">
      <h2 className="text-2xl font-semibold mb-6">Welcome, Doctor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Issue Prescription</CardTitle>
            <CardDescription>Create a new prescription for a patient</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctor-dashboard/issue-prescription">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Issue Prescription
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Register Yourself</CardTitle>
            <CardDescription>Register yourself as a doctor on our system!</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctor-dashboard/register-yourself">
              <Button className="w-full">
                <ClipboardList className="mr-2 h-4 w-4" /> Get Registered
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

