import {cn} from "@/lib/utils";
import React, {useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface propsType {
    className?: String;
    name?: string;
    id?: string;
    value: string;
    setFieldValue?: any;
    placeholder?: string;
}

const DateInput = ({
                       className,
                       name,
                       id,
                       value,
                       setFieldValue,
                       placeholder,
                       ...attributes
                   }: propsType) => {
    return (
        <Datepicker
            placeholder={placeholder}
            inputName={name}
            inputId={id}
            primaryColor={"blue"}
            asSingle={true}
            value={{startDate: value, endDate: value}}
            useRange={false}
            inputClassName={cn(
                "h-10 w-full rounded-md  px-3 py-2 focus:ring-0 font-normal border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-1 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            onChange={(e) => setFieldValue(name, e?.startDate)}
            {...attributes}
        />
    );
};
export default DateInput;
