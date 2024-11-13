// app/api/route.ts
import { NextRequest, NextResponse } from "next/server";
import { FormData } from "../utils";

// POST handler function for API route
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  // Destructure req body
  const { companyType, employmentType, salary, hoursWorked, isEducated } =
    body as FormData;

  // logic to calculate Salary Packaging limit
  let packageLimit = 0;

  // condition for corporate employee
  if (companyType === "Corporate") {
    if (employmentType === "Casual") {
      packageLimit = 0; // Casual employees get no limit
    } else {
      packageLimit =
      // 1% of $100,0000 plus 0.1% beyond
        salary <= 100000 ? salary * 0.01 : 1000 + (salary - 100000) * 0.001;
      if (employmentType === "Part-time") {
        packageLimit *= hoursWorked / 38;
      }
    }
  }

  // condition for Hospital employees
  if (companyType === "Hospital") {
    // Either a flat $10,000 or 20% of their salary, which ever is greater
    const calculatedLimit = Math.max(10000, salary * 0.2);
    packageLimit = Math.min(calculatedLimit, 30000);
    if (isEducated) {
      packageLimit += 5000; // add education bonus
    }

    if (employmentType === "Full-time") {
      // Increase limit by 9.5% and add 1.2% of salary for full-time employees
      packageLimit *= 1.095;
      packageLimit += salary * 0.012;
    }
  }

  // condition for PBI employees
if (companyType === "PBI") {
  // get lesser value of 50k or 32.55%
  packageLimit = Math.min(50000, salary * 0.3255); 
  // 10% for Casual employees
  if (employmentType === "Casual") {
    packageLimit = salary * 0.1; 
  }

  if (isEducated) {
    // $2,000 + 1% of the salary
    packageLimit += 2000 + salary * 0.01; 
  }

  if (employmentType === "Part-time") {
    // 80% of the full-time package limit
    packageLimit *= 0.8; 
  }
}


  // Return the calculated limit as JSON response
  return NextResponse.json({ limit: packageLimit });
}
