// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { FormData } from '../page';

// POST handler function for API route
export async function POST(req: NextRequest) {
  const body = await req.json();

  // Destructure req body
  const { companyType, employmentType, salary, hoursWorked, isEducated } = body as FormData;

  // logic to calculate Salary Packaging limit
  let packageLimit = 0;

  // condition for corporate employee
  if (companyType === 'Corporate') {
    if (employmentType === 'Casual') {
      packageLimit = 0; // Casual employees get no limit
    } else {
      packageLimit = salary <= 100000 ? salary * 0.01 : 1000 + (salary - 100000) * 0.001;
      if (employmentType === 'Part-time') {
        packageLimit *= hoursWorked / 38;
      }
    }
  }

  // condition for Hospital employees
  if (companyType === 'Hospital') {
    const calculatedLimit = Math.max(10000, salary * 0.2);
    packageLimit = Math.min(calculatedLimit, 30000);
    if (isEducated) {
      packageLimit += 5000; // add education bonus
    }
    
    if (employmentType === 'Full-time') {
      // Increase limit by 9.5% and add 1.2% of salary for full-time employees
      packageLimit *= 1.095;
      packageLimit += salary * 0.012;
    }
  }

  // condition for PBI employees
  if (companyType === 'PBI') {
    packageLimit = Math.min(50000, salary * 0.3255);
  }

  // Return the calculated limit as JSON response
  return NextResponse.json({ limit: packageLimit });
}
