import process from 'process';
import colors from 'colors'

let numCount = 0

let [num1, num2] = process.argv.slice(2)

const color = [colors.green, colors.yellow, colors.red]

if (!num1 || !num2) {
	console.log(colors.red('Укажите диапазон чисел для поиска простых чисел!'))
} else {
	if (num1 < 2) {
		num1 = 2
	};
	for (let i = num1; i <= num2; i++) {
		let prime = true

		for (let j = 2; j < i; j++) {
			if (i % j === 0) {
				prime = false
			};
		};
		if (prime) {
			console.log(color[numCount % 3](i))
			numCount++
		};
	};
	if (!numCount) {
		console.log(colors.red('Нет простых чисел в диапазоне'))
	};
};