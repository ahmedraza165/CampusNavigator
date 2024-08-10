'use client'
import { Button } from "@/components/ui/button"
import {

    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import axios from "axios";
import {toast} from "react-toastify";
import {Formik} from "formik";
import InputWithLabel from "@/components/ui/inputWithLabel";
import {Textarea} from "@/components/ui/textarea";
import React from "react";
import * as yup from "yup";

let validation = yup.object().shape({
    name: yup.string()
        .required('Name is required!')
        .min(3, 'Minimum 3 Characters')
        .max(50, 'Maximum 5 Characters'),
    description: yup.string(),
});


interface PropsType{
    getOrganizations: ( ) => void;
    setOpen: (open:boolean ) => void;
    organization: any
}


export function EditOrganization({getOrganizations,setOpen, organization}: PropsType) {


    const handleUpdate = async (values: any, {setSubmitting}: any) => {
        console.log('hello')
        try {
            const res = await axios.put(`/api/organization/${organization.id}`, values, {
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
                }
            );
            if (res) {
                toast.success("Updated successfully");
                getOrganizations();
                setOpen(false)
                setSubmitting(false);
            }
        } catch (error: any) {
            toast.error(error.message);
            setSubmitting(false);
        }
    }

    return (

            <DialogContent className="sm:max-w-[480px]">
                <div className="">
                    <Formik
                        initialValues={{name: organization.name, description: organization.description}}
                        validationSchema={validation}
                        onSubmit={(values, {setSubmitting}) => {
                            handleUpdate(values, {setSubmitting})
                        }}
                    >
                        {({
                                values,
                              errors,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              /* and other goodies */
                          }) => (
                              <div>

                                  <DialogHeader>
                                      <DialogTitle>Edit Organization</DialogTitle>
                                      <DialogDescription>
                                          Make changes to your organization here. Click save when you&apos;re done.
                                      </DialogDescription>
                                  </DialogHeader>
                                  <form className="space-y-6" onSubmit={handleSubmit}>
                                      <InputWithLabel
                                          label={'Organization Name'}
                                          className="py-2.5"
                                          name="name"
                                          type="text"
                                          placeholder={"Enter your organization name"}
                                          handleChange={handleChange}
                                          error={errors.name}
                                          value={values.name}

                                      />

                                      <div>
                                          <Label htmlFor={'description'}>
                                              Description
                                          </Label>
                                          <Textarea
                                              value={values.description}
                                              className="mt-2 resize-none"
                                              id="description"
                                              rows={3}
                                              name="description"
                                              onChange={handleChange}
                                              placeholder={"Enter organization description"}
                                          />
                                      </div>

                                      <DialogFooter>
                                          <Button disabled={isSubmitting} type="submit">Save changes</Button>
                                      </DialogFooter>
                                  </form>
                              </div>
                        )}
                    </Formik>

                </div>
            </DialogContent>
    )
}
