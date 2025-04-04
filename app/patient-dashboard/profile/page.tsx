import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { User } from "lucide-react"

export default function Profile() {
  return (
    <DashboardLayout role="Patient">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Patient Profile</h2>
        </div>
        
        <Card className="border-dashed shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-700">
              <User className="mr-2 h-5 w-5 text-purple-600" />
              Personal Information
            </CardTitle>
            <CardDescription>Manage your personal and medical information</CardDescription>
          </CardHeader>
          <CardContent className="pt-2 pb-6 text-center">
            <div className="py-12 px-4 flex flex-col items-center justify-center text-gray-500">
              <User className="h-16 w-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Profile information unavailable</p>
              <p className="max-w-md">Here you can manage your patient profile. This feature is not yet implemented.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}