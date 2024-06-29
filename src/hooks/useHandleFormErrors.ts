import * as yup from 'yup';

/**
|--------------------------------------------------
| Define the schema using yup
|--------------------------------------------------
*/
const form_field_schema = yup.object({
	phone_number: yup
		.number()
		.required('Phone number is required!')
		.typeError('Phone number is not valid'),
	first_name: yup.string().required('First name is required!'),
	last_name: yup.string().required('Last name is required!'),
	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),
});

/**
|--------------------------------------------------
| Serializer function to validate payload
|--------------------------------------------------
*/
export const validateFormField = async (payload: any) => {
	try {
		/**
        |--------------------------------------------------
        | Validate the payload against the form_field_schema
        |--------------------------------------------------
        */
		await form_field_schema.validate(payload, { abortEarly: false });
		/**
        |--------------------------------------------------
        | If validation passes, return an empty object (no errors)
        |--------------------------------------------------
        */
		return { isValid: true, errors: {} };
	} catch (error: any) {
		/**
        |--------------------------------------------------
        | If validation fails, extract and return the errors
        |--------------------------------------------------
        */
		const errorDetails: any = {};
		error.inner.forEach((err: any) => {
			errorDetails[err.path] = err.message;
		});
		return { isValid: false, errors: errorDetails };
	}
};
