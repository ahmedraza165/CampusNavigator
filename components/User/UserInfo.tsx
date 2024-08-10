import React from 'react';


interface PropsTypes {
    title: string,
    value: string
}

const MyComponent = ({title, value}: PropsTypes) => {
    return (
        <>
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{title}</dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{value}</div>
                    {title !== 'Email' &&
                        <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Update
                        </button>}
                </dd>
            </div>
        </>
    );
};

export default MyComponent;
