const cols = document.querySelectorAll(".col");

function generateRandomColor() {
	const hexCode = "0123456789ABCDEF"
	let colorCode = "";

	for (let index = 0; index < 6; index++) {
		colorCode += hexCode[Math.floor(Math.random() * hexCode.length)];
	}

	return "#" + colorCode;
}

function setRandomColors() {
	cols.forEach(col => {
		const text = col.querySelector("h2");
		const button = col.querySelector("button");
		const color = generateRandomColor();

		text.textContent = color;
		col.style.background = color;

		setTextColor(text, color);
		setTextColor(button, color);
	})
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance();
	text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors();
