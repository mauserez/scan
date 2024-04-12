export const isInn = (value: string) => {
	return /^[0-9]{10,12}$/.test(value);
};
