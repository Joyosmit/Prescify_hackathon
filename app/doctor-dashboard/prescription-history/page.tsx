import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { FileClock } from "lucide-react"

export default function PrescriptionHistory() {
  return (
    <DashboardLayout role="Doctor">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">📚 Prescription History</h2>

        <Card className="shadow-md rounded-2xl p-6 bg-white dark:bg-gray-900 text-center">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <FileClock className="w-10 h-10 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Feature Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              This section will soon display all your issued prescriptions, along with timestamps and blockchain verification status.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
