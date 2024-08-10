import React from "react";

export default function ErrorMessage ({message}: {message: string}) {
    return (
        <p className={"text-red-600 text-xs mt-1"}>{message}</p>
    )
}