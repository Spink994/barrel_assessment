/**
 * Convert an ISO date string to a more readable format.
 *
 * @param isoDate - The ISO date string to convert.
 * @returns A string representing the date in the format "Month Day, Year".
 */
export default function formatDate(isoDate: string): string {
	const date = new Date(isoDate);

	/**
    |--------------------------------------------------
    | Options for formatting the date
    |--------------------------------------------------
    */
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	/**
    |--------------------------------------------------
    | Format the date using Intl.DateTimeFormat
    |--------------------------------------------------
    */
	return new Intl.DateTimeFormat('en-US', options).format(date);
}
