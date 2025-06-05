import * as yup from 'yup';
import {purchaseTickets} from "@/db/actions/purchaseTickets";
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
    street: yup
        .string()
        .required('La via è obbligatoria'),
    zip: yup
        .number()
        .required('Il CAP è obbligatorio'),
    city: yup
        .string()
        .required('La città è obbligatoria'),
    country: yup
        .string()
        .required('Lo stato è obbligatorio'),
    province: yup
        .string()
        .required('La provincia è obbligatoria'),

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

export const UpgradeToOrganizerSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .email('Inserisci un indirizzo email valido')
        .required('Inserisci un indirizzo email valido'),

    vatNumber: yup
        .string()
        .required('Inserisci una partita IVA'),

    companyName: yup
        .string()
        .required('Inserisci una ragione sociale'),
});

export const CreateNewTicketTypeSchema = yup.object().shape({
    title: yup
        .string()
        .required('Inserisci una partita IVA'),

    minAge: yup
        .number()
        .nullable()
        .optional(),
    maxAge: yup
        .number()
        .nullable()
        .optional(),

    price: yup
        .number()
        .required('Inserisci un prezzo'),

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

    eventId: yup
        .number()
        .required('Inserisci un evento'),
});

export const PurchaseTicketsSchema = yup.object().shape({
    firstname: yup
        .string()
        .required('Inserisci un nome valido'),
    lastname: yup
        .string()
        .required('Inserisci un cognome valido'),

    birthDate: yup
        .date()
        .min(new Date(-1735693200))
        .typeError('Inserisci una data valida')
        .required('La data di nascita è obbligatoria'),

    email: yup
        .string()
        .trim()
        .email('Inserisci una mail valida')
        .required('Inserisci una mail valida'),

    birthplace: yup
        .string()
        .required('Inserisci una città valida'),

    zip: yup
        .number()
        .required('Inserisci un CAP valido'),
    country: yup
        .string()
        .required('Lo stato è obbligatorio'),
    province: yup
        .string()
        .required('La provincia è obbligatoria'),

    address: yup
        .string()
        .required("L'indirizzo è obbligatorio"),

    phone: yup
        .string()
        .matches(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            "Telefono non valido",
        ),

    cardNumber: yup
        .string()
        .required('Il numero carta è obbligatorio'),
    expiryDate: yup
        .string()
        .required('La data di scadenza è obbligatoria'),
    cvv: yup
        .string()
        .required('Il CVV è obbligatorio'),
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
        category?: string[];
        city?: string[];
        street?: string[];
        zip?: string[];
        province?: string[];
        country?: string[];
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


export type CreateNewTicketFormState =
    | {
    errors?: {
        title?: string[];
        minAge?: string[];
        maxAge?: string[];
        price?: string[];
        startDate?: string[];
        endDate?: string[];
        eventId?: string[];
        genericerror?: string[];
    };
    message?: string;
}
    | undefined;

export type UpgradeToOrganizerFormState =
    | {
    errors?: {
        email?: string[];
        companyName?: string[];
        vatNumber?: string[];
        genericerror?: string[];
    };
    message?: string;
}
    | undefined;

export type PurchaseTicketsFormState =
    | {
    errors?: {
        firstname?: string[];
        lastname?: string[];
        day?: string[];
        month?: string[];
        year?: string[];
        email?: string[];
        birthDate?: string[];
        birthplace?: string[];
        zip?: string[];
        province?: string[];
        country?: string[];
        address?: string[];
        phone?: string[];
        cardNumber?: string[];
        expiryDate?: string[];
        cvv?: string[];
        genericerror?: string[];
    };
    message?: string;
}
    | undefined;