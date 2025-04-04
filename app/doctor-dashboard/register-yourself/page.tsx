import { DashboardLayout } from "@/components/dashboard-layout"
import RegisterDoctor from "@/components/register-doctor"
import { Card, CardContent } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export default function RegisterYourself() {
  return (
    <DashboardLayout role="Doctor">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <UserPlus className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Register Yourself</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
          Fill in your professional details to be verified and registered as a certified doctor on our platform.
        </p>

        <Card className="shadow-md rounded-2xl p-6 bg-white dark:bg-gray-900">
          <CardContent className="space-y-4">
            <RegisterDoctor />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
