import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function ManagePatients() {
  return (
    <DashboardLayout role="Doctor">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">👩‍⚕️ Manage Patients</h2>

        <Card className="shadow-md rounded-2xl p-6 bg-white dark:bg-gray-900 text-center">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <AlertCircle className="w-10 h-10 text-yellow-500" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              This feature is under development. Soon, you'll be able to view, manage, and interact with your patient list in a seamless way.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
