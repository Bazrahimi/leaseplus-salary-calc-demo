"use client";
// app/page.tsx
import { ChangeEvent, useState } from "react";

const HomePage = () => {
  const [FormData, SetFormData] = useState<FormData>({
    companyType: "",
    employmentType: "",
    salary: "",
    hoursWorked: "",
    isEducated: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    SetFormData({
      ...FormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(FormData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("formData", FormData);

  return (
    <>
      <h1>LeasePlus Salary Packaging Estimator </h1>
      <form>
        <label>Company Type</label>
        <select name="companyType" onChange={handleChange}>
          <option value="">Select</option>
          <option value="Corporate">Corporate</option>
          <option value="Hospital">Hospital</option>
          <option value="PBI">PBI</option>
        </select>
        <br />

        <label>Employment Type:</label>
        <select name="employmentType" onChange={handleChange}>
          <option value="">Select</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Casual">Casual</option>
        </select>
        <br />

        {FormData.employmentType === "Part-time" && (
          <>
            <label>Hours Worked per week</label>
            <input type="number" name="hoursWorked" onChange={handleChange} />
          </>
        )}
        <br />

        <label>Salary</label>
        <input type="number" name="salary" onChange={handleChange} />
        <br />

        <label>Education</label>
        <input type="checkbox" name="isEducated" onChange={handleChange} />
        <br />

        <button type="button" onClick={handleSubmit}>
          Calculate
        </button>
      </form>
    </>
  );
};

export default HomePage;

export interface FormData {
  companyType: string;
  employmentType: string;
  salary: number | "";
  hoursWorked: number | "";
  isEducated: boolean;
}
