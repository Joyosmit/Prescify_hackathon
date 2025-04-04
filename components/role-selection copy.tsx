"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole && termsAccepted) {
      router.push(`/${selectedRole.toLowerCase()}-dashboard`);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Select Your Role</CardTitle>
        <CardDescription>Choose your role to access the appropriate dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Button
            variant={selectedRole === "Doctor" ? "default" : "outline"}
            onClick={() => handleRoleSelect("Doctor")}
          >
            Doctor
          </Button>
          <Button
            variant={selectedRole === "Patient" ? "default" : "outline"}
            onClick={() => handleRoleSelect("Patient")}
          >
            Patient
          </Button>
          <Button
            variant={selectedRole === "Pharmacist" ? "default" : "outline"}
            onClick={() => handleRoleSelect("Pharmacist")}
          >
            Pharmacist
          </Button>
          <Button
            variant={selectedRole === "Verifier" ? "default" : "outline"}
            onClick={() => handleRoleSelect("Verifier")}
          >
            Verifier
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="w-5 h-5 cursor-pointer"
          />
          <label htmlFor="terms" className="text-gray-300 cursor-pointer">
            I agree to the{" "}
            <a href="/terms" className="text-blue-600 underline hover:text-blue-800">
              terms and conditions
            </a>
          </label>
        </div>
        <Button className="w-full" onClick={handleContinue} disabled={!selectedRole || !termsAccepted}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
