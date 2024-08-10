"use client";
import {Button} from "@/components/ui/button";
import {Formik} from "formik";
import React from "react";
import {toast} from "react-toastify";
import Link from "next/link";
import axios from "axios";
import {userSchema} from "@/lib/schema";
import {useRouter} from 'next/navigation';
import InputWithLabel from "@/components/ui/inputWithLabel";




export default function SignupForm() {

    const router = useRouter();

    const handleSignIn = async (values: any, {setSubmitting}: any) => {

        try {
            const res = await axios.post('/api/auth/register', values, {
                headers: {
                    "content-type": "application/json"
                }
            }).catch(error => {
                if (error.response) {
                    toast.error(error.response.data.message);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                setSubmitting(false);
            });
            console.log(res)

            if (res) {
                toast.info("Please check your email and verify your account.");
                await router.push('/sign-in')
                setSubmitting(false);
            }


        } catch (err: any) {
            toast.error(err.message);
            setSubmitting(false);
        }
    };


    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[520px]">
                <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            // dob: "",
                        }}
                        validationSchema={userSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            handleSignIn(values, {setSubmitting});
                        }}
                    >
                        {({
                              values,
                              errors,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              setFieldValue,
                              /* and other goodies */
                          }) => (
                            <form className="space-y-2" onSubmit={handleSubmit}>

                                <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>

                                    <InputWithLabel
                                        label="First Name"
                                        name="firstName"
                                        handleChange={handleChange}
                                        error={errors.firstName}
                                        placeholder="John"
                                    />

                                    <InputWithLabel
                                        label="Last Name"
                                        name="lastName"
                                        handleChange={handleChange}
                                        error={errors.lastName}
                                        placeholder="Wick"
                                    />
                                </div>

                                {/*<div>*/}
                                {/*    <Label htmlFor="dob">Date of birth</Label>*/}
                                {/*    <div className="mt-1">*/}
                                {/*        <DatePicker*/}
                                {/*            setFieldValue={setFieldValue}*/}
                                {/*            value={values.dob}*/}
                                {/*            name="dob"*/}
                                {/*            id="dob"*/}
                                {/*            className={*/}
                                {/*                errors.dob*/}
                                {/*                    ? "border-red-600"*/}
                                {/*                    : "focus-visible:border-blue-500"*/}
                                {/*            }*/}
                                {/*            placeholder="1998-01-01"*/}

                                {/*        />*/}
                                {/*    </div>*/}
                                {/*    {errors.dob && <ErrorMessage message={errors.dob}/>}*/}
                                {/*</div>*/}

                                <InputWithLabel
                                    label="Email address"
                                    name="email"
                                    handleChange={handleChange}
                                    error={errors.email}
                                    placeholder="john@example.com"
                                />

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
                                    placeholder='••••••••'
                                />

                                <div className={"pt-5"}>
                                    <Button
                                        disabled={isSubmitting}
                                        className="w-full"
                                        type="submit"
                                    >
                                        Sign up
                                    </Button>
                                </div>

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
                    {/*<SignWithProvider/>*/}
                </div>
            </div>
        </>
    );
}
