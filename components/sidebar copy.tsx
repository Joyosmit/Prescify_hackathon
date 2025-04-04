import Link from "next/link"
import { Home, FileText, Pill, User, Users, ClipboardList, Search, X, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  role: "Doctor" | "Patient" | "Pharmacist" | "Verifier";
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const menuItems = {
    Doctor: [
      { icon: Home, label: "Dashboard", href: "/doctor-dashboard" },
      // { icon: ShieldCheck, label: "Verify Yourself", href: "/doctor-dashboard/verify-yourself" },
      { icon: FileText, label: "Issue Prescription", href: "/doctor-dashboard/issue-prescription" },
      // { icon: Users, label: "Manage Patients", href: "/doctor-dashboard/manage-patients" },
      // { icon: ClipboardList, label: "Prescription History", href: "/doctor-dashboard/prescription-history" },
      { icon: ClipboardList, label: "Register Yourself", href: "/doctor-dashboard/register-yourself" },
    ],
    Patient: [
      { icon: Home, label: "Dashboard", href: "/patient-dashboard" },
      // { icon: Search, label: "Verify Prescription", href: "/patient-dashboard/verify-prescription" },
      // { icon: ClipboardList, label: "Prescription History", href: "/patient-dashboard/prescription-history" },
      // { icon: User, label: "Profile", href: "/patient-dashboard/profile" },
    ],
    Pharmacist: [
      { icon: Home, label: "Dashboard", href: "/pharmacist-dashboard" },
      // { icon: ShieldCheck, label: "Verify Yourself", href: "/pharmacist-dashboard/verify-yourself" },
      { icon: Search, label: "Verify Prescription", href: "/pharmacist-dashboard/verify-prescription" },
      // { icon: Pill, label: "Dispense Medication", href: "/pharmacist-dashboard/dispense-medication" },
      // { icon: ClipboardList, label: "Dispensing History", href: "/pharmacist-dashboard/dispensing-history" },
      { icon: ClipboardList, label: "Register Yourself", href: "/pharmacist-dashboard/register-pharmacist" },
    ],
    Verifier: [
      { icon: Home, label: "Dashboard", href: "/verifier-dashboard" },
      { icon: User, label: "Verify Doctor", href: "/verifier-dashboard/verify-doctor" },
      { icon: User, label: "Verify Pharmacist", href: "/verifier-dashboard/verify-pharmacist" },
    ],
  }

  return (
    <aside
      className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out transform
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0
    `}
    >
      <Button variant="ghost" size="icon" className="absolute top-4 right-4 md:hidden" onClick={onClose}>
        <X className="h-6 w-6" />
        <span className="sr-only">Close sidebar</span>
      </Button>
      <nav className="mt-8 md:mt-0">
        <ul>
          {menuItems[role].map((item, index) => (
            <li key={index} className="mb-2">
              <Link href={item.href} className="flex items-center p-2 rounded hover:bg-gray-700" onClick={onClose}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

