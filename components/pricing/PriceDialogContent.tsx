import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { allProducts } from "@/lib/Product";
import PricingCard from "@/components/pricing/PricingCard";

const planeTypes = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
];

const PriceDialogContent = () => {
  const [selectedType, setSelectedType] = useState(planeTypes[0]);

  return (
    <>
      <DialogContent className="sm:max-w-7xl">
        <div className="bg-white py-10 overflow-y-scroll max-h-[90vh]">
          <style jsx>{`
            ::-webkit-scrollbar {
              display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
            }
            /* Hide scrollbar for Firefox */
            div::-webkit-scrollbar-track {
              -webkit-box-shadow: none !important;
              background-color: transparent !important;
            }
          `}</style>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Pricing plans for teams of all sizes
              </p>
            </div>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg leading-8 text-gray-600">
              Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
              quasi iusto modi velit ut non voluptas in. Explicabo id ut
              laborum.
            </p>
            <div className="mt-5 flex justify-center">
              <RadioGroup
                value={selectedType}
                onChange={setSelectedType}
                className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
              >
                <RadioGroup.Label className="sr-only">
                  Payment frequency
                </RadioGroup.Label>
                {planeTypes.map((option) => (
                  <RadioGroup.Option
                    key={option.value}
                    value={option}
                    className={({ checked }) =>
                      cn(
                        checked ? "bg-indigo-600 text-white" : "text-gray-500",
                        "cursor-pointer rounded-full px-2.5 py-1"
                      )
                    }
                  >
                    <span>{option.label}</span>
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
            <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {selectedType.value === "monthly"
                ? allProducts[1].products.map((product) => (
                    <PricingCard
                      product={product}
                      key={product.name}
                      selectedType={selectedType}
                    />
                  ))
                : allProducts[0].products.map((product) => (
                    <PricingCard
                      product={product}
                      key={product.name}
                      selectedType={selectedType}
                    />
                  ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  );
};

export default PriceDialogContent;
