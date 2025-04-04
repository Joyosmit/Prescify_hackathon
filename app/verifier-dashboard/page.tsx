import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { FileText, Users, Shield, ClipboardCheck } from "lucide-react"

export default function VerifierDashboard() {
  return (
    <DashboardLayout role="Verifier">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-100 p-2 rounded-full">
            <Shield className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome, Board of Verifiers</h2>
            <p className="text-gray-600">Manage credential verification for healthcare professionals</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                <CardTitle>Verify Doctor</CardTitle>
              </div>
              <CardDescription>Verify a doctor's credentials</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-500 mb-4">Review medical licenses, qualifications, and validate doctor registrations.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/verifier-dashboard/verify-doctor" className="w-full">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Verify Doctor
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <CardTitle>Verify Pharmacist</CardTitle>
              </div>
              <CardDescription>Verify a pharmacist's credentials</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-500 mb-4">Confirm pharmacy licenses, education, and approve pharmacist registrations.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/verifier-dashboard/verify-pharmacist" className="w-full">
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  Verify Pharmacist
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-blue-500" />
                <CardTitle>Verification History</CardTitle>
              </div>
              <CardDescription>View past verifications</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-500 mb-4">Access records of all previously verified healthcare professionals.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/verifier-dashboard/verification-history" className="w-full">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  View History
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}