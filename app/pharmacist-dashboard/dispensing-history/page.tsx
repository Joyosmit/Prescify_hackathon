import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function DispensingHistory() {
  return (
    <DashboardLayout role="Pharmacist">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Dispensing History</h2>
        </div>
        
        <Card className="border-dashed shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-700">
              <Calendar className="mr-2 h-5 w-5 text-orange-600" />
              Medication Dispensing Records
            </CardTitle>
            <CardDescription>View complete history of dispensed medications</CardDescription>
          </CardHeader>
          <CardContent className="pt-2 pb-6 text-center">
            <div className="py-12 px-4 flex flex-col items-center justify-center text-gray-500">
              <Calendar className="h-16 w-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No dispensing records available</p>
              <p className="max-w-md">Here you can view the dispensing history. This feature is not yet implemented.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}