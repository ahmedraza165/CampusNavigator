"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";

import { toast } from "react-toastify";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import InputWithLabel from "@/components/ui/inputWithLabel";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function verifyEmail() {
      try {
        const searchParams = new URLSearchParams(window.location.search); // Extract search params
        const token = searchParams.get("token"); // Get the token from search params

        if (!token) {
          throw new Error("Verification token not found");
        }

        // Verify the token by sending a request to your backend
        const response = await axios.post("/api/auth/reset-verify", { token });
        setLoading(false);
        setVerified(true);
      } catch (error) {
        // Handle errors
        console.error("Error verifying email:", error);
        toast.error("Failed to verify email. Please try again.");
        setLoading(false);
      }
    }

    verifyEmail();
  }, []);

  const handleSignIn = async (values: any, { setSubmitting }: any) => {
    const { password, confirmPassword } = values;
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      }

      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");

      if (!token) {
        throw new Error("Verification token not found");
      }

      // Send request to reset password with token and new password
      const response = await axios.post("/api/auth/reset-password", {
        token,
        password,
        confirmPassword,
      });
      toast.success("Password updated successfully");
      router.push("/sign-in"); // Redirect to login page after password update
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  return (
    <div>
      {loading ? (
        <div className={"flex items-center justify-center pt-56"}>
          <PropagateLoader />
        </div>
      ) : verified ? (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Update Password
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[520px]">
            <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleSignIn(values, { setSubmitting });
                }}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <InputWithLabel
                      label="Password"
                      name="password"
                      handleChange={handleChange}
                      error={errors.password}
                      // placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      placeholder="••••••••"
                      type="password"
                    />
                    <InputWithLabel
                      label="Confirm Password"
                      name="confirmPassword"
                      handleChange={handleChange}
                      error={errors.confirmPassword}
                      type="password"
                      placeholder="••••••••"
                    />

                    <div className={"pt-5"}>
                      <Button
                        disabled={isSubmitting}
                        className="w-full"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <p>Email verification failed.</p>
      )}
    </div>
  );
}
