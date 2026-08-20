
"use client";

import { useState } from "react";
import ReusableInput from "@/components/ui/ReusableInput";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    dob: "",
  });

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting to database:", formData);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit}>

        <ReusableInput
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          required
          placeholder="John Doe"
        />

        <ReusableInput
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange("age")}
          required
        />

        <ReusableInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          required
        />

        <ReusableInput
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange("dob")}
          required
        />

        <Button variant="primary" type="submit" className="w-100">
          Save Profile
        </Button>
      </Form>
    </div>
  );
}
