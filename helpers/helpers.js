export const getContol = (key) => {
	let keyArr = controlOnce(1, key);
	let control = keyArr % 11;
	if (control === 10) {
		let keyArr = controlOnce(2, key);
		control = keyArr % 11;
		if (control === 10) {
			control = 0;
		}
	}
	return control;
};

const controlOnce = (tryget, key) => {
	let chainArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5];
	if (tryget === 2) {
		chainArr = [3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7];
	}
	const keyArr = key.split("").reduce((acc, item, i) => +acc + item * chainArr[i], 0);
	return keyArr;
};
