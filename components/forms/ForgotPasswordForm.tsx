"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import axios from "axios";
import InputWithLabel from "@/components/ui/inputWithLabel";
import { toast } from "react-toastify";
import Link from "next/link";

interface FormValues {
  email: string;
}

export default function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (values: any, { setSubmitting }: any) => {
    try {
      const res = await axios.post("/api/auth/forgot-password", values, {
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(res);

      if (res) {
        toast.success("Email sent successfully");
      }
    } catch (err) {
      toast.error("Error sending email:");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[520px]">
      <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSignIn(values, { setSubmitting });
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form className="space-y-2" onSubmit={handleSubmit}>
              <InputWithLabel
                label="Email address"
                name="email"
                handleChange={handleChange}
                placeholder="john@example.com"
              />
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Submit
              </Button>
              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
