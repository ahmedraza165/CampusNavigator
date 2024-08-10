import * as yup from "yup";


export const userSchema = yup.object().shape({
    firstName: yup.string().required("First Name required!"),
    lastName: yup.string().required("Last Name required!"),
    // dob: yup.string().required("Date of birth required"),
    email: yup
        .string()
        .required("Email is required!")
        .email("Please enter your valid email!"),
    password: yup.string()
        .required("Password required!")
        // .min(8, "Please enter at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref("password")], "Passwords must match")

});
