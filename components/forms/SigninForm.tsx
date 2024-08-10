'use client'
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Formik} from 'formik';
import React from "react";
import {toast} from "react-toastify";
import * as yup from 'yup';
import Link from "next/link";
import {signIn} from "next-auth/react";
import { useRouter} from "next/navigation";
import InputWithLabel from "@/components/ui/inputWithLabel";


let loginSchema = yup.object().shape({
    password: yup.string().required('Password required!'),
    email: yup.string().required('Email is required!').email('Please enter your valid email!'),

});

export default function SigninForm() {

    const router = useRouter();


    const handleSignIn = async (values: any, {setSubmitting}: any) => {
        const signInData: any = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })

        if (signInData.error) {
            console.log(signInData.error)
            toast.error("Incorrect credential or Email not verified!")
        } else {
            router.push('/chat')
            toast.success('Login successfully')
        }

        setSubmitting(false)

    }

    return (
        <>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={loginSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            handleSignIn(values, {setSubmitting})
                        }}
                    >
                        {({

                              errors,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              /* and other goodies */
                          }) => (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <InputWithLabel
                                    label="Email address"
                                    name="email"
                                    handleChange={handleChange}
                                    autoComplete="email"
                                    error={errors.email}
                                />
                                <InputWithLabel
                                    label="Password"
                                    name="password"
                                    handleChange={handleChange}
                                    autoComplete="current-password"
                                    error={errors.password}
                                    type="password"
                                />

                                <div className="flex items-center justify-between">
                                    <div className="items-top flex space-x-2">
                                        <Checkbox
                                            id="remember-me"
                                            name="remember-me"
                                        />
                                        <Label htmlFor="remember-me">
                                            Remember me
                                        </Label>
                                    </div>

                                    <div className="text-sm leading-6">
                                        <Link href="/forgot-password"
                                              className="font-semibold text-blue-600 hover:text-blue-500">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <Button
                                        disabled={isSubmitting}
                                        className="w-full"
                                        type="submit"
                                    >
                                        Sign in
                                    </Button>
                                </div>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Don&lsquo;t have an account?{' '}
                                    <Link href="/sign-up"
                                          className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                                        Create an account
                                    </Link>
                                </p>
                            </form>
                        )}
                    </Formik>


                </div>


            </div>

        </>
    )
}
