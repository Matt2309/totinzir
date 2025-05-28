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


export const CreateEventSchema = yup.object().shape({
    title: yup
        .string()
        .required('Il titolo è obbligatorio'),

    startDate: yup
        .date()
        .typeError('Inserisci una data valida')
        .required('La data di inizio è obbligatoria'),

    endDate: yup
        .date()
        .typeError('Inserisci una data valida')
        .min(
            yup.ref('startDate'),
            'La data di fine deve essere successiva a quella di inizio'
        )
        .required('La data di fine è obbligatoria'),

    location: yup
        .string()
        .required('Il luogo è obbligatorio'),

    coordinates: yup
        .string()
        .matches(
            /^[-+]?\d+(\.\d+)?,\s*[-+]?\d+(\.\d+)?$/,
            'Inserisci coordinate valide (es. 41.9028, 12.4964)'
        )
        .required('Le coordinate sono obbligatorie'),

    category: yup
        .string()
        .required('La categoria è obbligatoria'),

    image: yup
        .string()
        .url('Inserisci un URL valido')
        .required('Il campo immagine è obbligatorio'),

    topic: yup
        .string()
        .optional(),

    guideName: yup
        .string()
        .optional(),

    guideNumber: yup
        .string()
        .transform((value) => value === '' ? undefined : value)
        .optional()
        .matches(
            /^(\+?\d{1,4}\s?)?(\d{6,15})$/,
            'Inserisci un numero valido (es. +39 3331234567)'
        ),

    description: yup
        .string()
        .required('La descrizione è obbligatoria'),
});

export const CreateCategorySchema = yup.object().shape({
    title: yup
        .string()
        .required('Il titolo è obbligatorio'),

    duration: yup
        .number()
        .nullable()
        .optional(),

    difficulty: yup
        .string()
        .optional(),
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


export type CreateEventFormState =
    | {
    errors?: {
        title?: string[];
        startDate?: string[];
        endDate?: string[];
        location?: string[];
        coordinates?: string[];
        image?: string[];
        description?: string[];
        type?: string[];
        topic?: string[];
        guideName?: string[];
        guideNumber?: string[];
        genericerror?: string[];
    };
    message?: string;
}
    | undefined;

export type CreateCategoryFormState =
    | {
    errors?: {
        title?: string[];
        duration?: string[];
        difficulty?: string[];
        genericerror?: string[];
    };
    message?: string;
}
    | undefined;