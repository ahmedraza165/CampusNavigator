import React from "react";
import OrganizationLayout from "@/components/Organizations/OrganizationLayout";
import {ToastContainer} from "react-toastify";
import SubscriptionCheckup from "@/components/SubscriptionCheckup/SubscriptionCheckup";

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={'h-full'}>
        <ToastContainer/>
        <SubscriptionCheckup/>
        <div className={'min-h-full'}>
            <OrganizationLayout/>
            {children}
        </div>
        </body>
        </html>
    )
}
