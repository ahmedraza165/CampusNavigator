import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import ErrorMessage from "@/components/ui/ErrorMessage";

const InputWithLabel  = ({handleChange, label, name, error, ...attributes}:any) => {
    return (
        <div>
            <Label htmlFor={name}>
                {label}
            </Label>
            <div className="mt-2">
                <Input
                    id={name}
                    name={name}
                    onChange={handleChange}
                    {...attributes}
                    className={error ? "border-red-600" : "focus-visible:border-blue-500"}
                />

            </div>
            {error && <ErrorMessage message={error}/>}
        </div>
    )
}

export default InputWithLabel;