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

export const SignUpFormSchema = yup.object().shape({
    firstname: yup.string().required("Campo obbligatorio"),
    lastname: yup.string().required("Campo obbligatorio"),
    phone: yup
        .string()
        .matches(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            "Telefono non valido",
        ),
    age: yup
        .number()
        .typeError("Campo obbligatorio"),
    fc: yup
        .string()
        .matches(
            /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i,
            "Codice fiscale non valido"
        ),
    email: yup
        .string()
        .email("l'e-mail deve essere un'e-mail valida")
        .required('Campo obbligatorio'),
    password: yup
        .string()
        .required("richiesto")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
            "• Deve contenere lettere e numeri\n• Deve contenere caratteri speciali (@$!%*?&)\n• Deve contenere sia lettere maiuscole che minuscole\n• Deve essere lunga almeno 12 caratteri",
        ),
    policy: yup
        .string()
        .required("Campo obbligatorio"),
});

export type SigninFormState =
    | {
    errors?: {
        email?: string[];
        password?: string[];
        genericerror?: string[];
    };
    message?: string;
}
    | undefined;

export type SignupFormState =
    | {
    errors?: {
        firstname?: string[];
        lastname?: string[];
        phone?: string[];
        age?: number[];
        fc?: string[];
        email?: string[];
        password?: string[];
        policy?: string[];
        genericerror?: string[];
    };
    message?: string;
}
    | undefined;
