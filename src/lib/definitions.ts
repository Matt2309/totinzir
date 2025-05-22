import * as yup from 'yup';

export const SignInFormSchema = yup.object({
    email: yup
        .string()
        .trim()
        .email('Please enter a valid email.')
        .required('Email is required.'),
    password: yup
        .string()
        .required('Please enter a valid password.')
});

export type FormState =
    | {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string;
}
    | undefined;
