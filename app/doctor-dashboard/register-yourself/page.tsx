import { DashboardLayout } from "@/components/dashboard-layout"
import RegisterDoctor from "@/components/register-doctor"

export default function RegisterYourself() {
  return (
    <DashboardLayout role="Doctor">
      <h2 className="text-2xl font-semibold mb-6">Register Yourself</h2>
      <RegisterDoctor/>
    </DashboardLayout>
  )
}

