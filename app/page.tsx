"use client";
// app/page.tsx
import { ChangeEvent, useState } from "react";
import { FormData } from "./utils";

const HomePage = () => {
  const [FormData, SetFormData] = useState<FormData>({
    companyType: "",
    employmentType: "",
    salary: "",
    hoursWorked: "",
    isEducated: false,
  });

  const [response, setResponse] = useState<string | null>(null);

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
      setResponse(`The calculated salary package limit is: ${data.limit}`);
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("formData", FormData);

  return (
    <div className="max-w-lg max-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        LeasePlus Salary Packaging Limit Calculator{" "}
      </h1>
      <form className="block font-medium mb-1">
        <div>
          <label className="block font-medium mb-1">Company Type</label>
          <select
            className="w-full p-2 border border-e-gray-300 rounded-md"
            name="companyType"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Corporate">Corporate</option>
            <option value="Hospital">Hospital</option>
            <option value="PBI">PBI</option>
          </select>

          <label className="block font-medium mb-1">Employment Type:</label>
          <select
            name="employmentType"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Casual">Casual</option>
          </select>

          {FormData.employmentType === "Part-time" && (
            <div>
              <label className="block font-medium mb-1">
                Hours Worked per week
              </label>
              <input
                type="number"
                name="hoursWorked"
                placeholder="Whole Hours ONLY"
                className="w-full p-2 border border-gray-300"
                onChange={handleChange}
              />
            </div>
          )}

          <label className="block font-medium mb-1">Salary</label>
          <input
            type="number"
            name="salary"
            placeholder="e.g., 100000 (Enter full number without $ or commas)"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isEducated"
              className="mr-2"
              onChange={handleChange}
            />
            <label className="pl-4font-medium">
              Completed a Bachelor Degree or Higher
            </label>
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue mt-5 "
            onClick={handleSubmit}
          >
            Calculate Salary Limit
          </button>
          {response && (
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
              <p className="text-gray-800">{response}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default HomePage;
