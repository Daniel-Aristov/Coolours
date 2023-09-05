const cols = document.querySelectorAll(".col");

document.addEventListener('keydown', (event) => {
	event.preventDefault();
	if (event.code.toLowerCase() === 'space') {
		setRandomColors();
	}
})

document.addEventListener('click', (event) => {
	const type = event.target.dataset.type;

	if (type === 'lock') {
		const node = 
			event.target.tagName.toLowerCase() === 'i'
			? event.target
			: event.target.children[0];

		node.classList.toggle('fa-lock-open');
		node.classList.toggle('fa-lock');
	} else if (type === 'copy') {
		copyToClipboard(event.target.textContent);
	}
})

function generateRandomColor() {
	const hexCode = "0123456789ABCDEF"
	let colorCode = "";

	for (let index = 0; index < 6; index++) {
		colorCode += hexCode[Math.floor(Math.random() * hexCode.length)];
	}

	return "#" + colorCode;
}

function copyToClipboard(text) {
	return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
	colors = isInitial ? getColorFromHash() : [];

	cols.forEach((col, index) => {
		const isLoked = col.querySelector('i').classList.contains('fa-lock');
		const text = col.querySelector("h2");
		const button = col.querySelector("button");

		if (isLoked) {
			colors.push(text.textContent);
			return 
		}	

		const color = isInitial 
			? colors[index] 
				? colors[index] 
				: generateRandomColor()
			: generateRandomColor();

		if (!isInitial) {
			colors.push(color);
		}

		text.textContent = color;
		col.style.background = color;

		setTextColor(text, color);
		setTextColor(button, color);
	})

	updateColorsHach(colors);
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance();
	text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHach(colors = []) {
	document.location.hash = colors
		.map(color => {
			return color.toString().substring(1);
		})
		.join('-');
}

function getColorFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash
			.substring(1)
			.split('-')
			.map((color) => '#' + color);
	} else return [];
}

setRandomColors(true);
