const unwrap = <T extends {}>(obj: T, keys: Array<keyof T>) => {
	let newObj = {} as T;
	for (const key of keys) {
		newObj[key] = obj[key];
		// if (obj[key]) newObj[key] = obj[key];
	}
	return newObj;
};

export { unwrap };
