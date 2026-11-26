let selectedColor = document.getElementById("choose-color");

const form = document.getElementById("choose-color-and-scheme-form");
const select = document.getElementById("choose-scheme");
let isLoading = false;
let lastGeneratedColor = null;

const initialColor = () => {
	let a = Math.floor(Math.random() * 0x1000000);
	let b = a.toString(16);
	let hex = b.padStart(6, "0");
	return hex;
};

async function fetchColors(color, scheme) {
	try {
		const response = await fetch(
			`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=5`
		);
		if (!response.ok) {
			throw new Error("Something went wrong, please try again");
		}
		hideErrorMessage();
		const data = await response.json();
		addColorsToDivs(data);
		lastGeneratedColor = color;
	} catch (error) {
		renderErrorMessage(error);
		console.log(error);
	}
}

function renderLoader() {
	const loadingMessage = document.getElementById("loading-message");
	loadingMessage.textContent = "Loading...";
	loadingMessage.classList.add("loading-message");
}

function hideLoader() {
	const loadingMessage = document.getElementById("loading-message");
	loadingMessage.textContent = "";
	loadingMessage.classList.remove("loading-message");
}
function renderErrorMessage(error) {
	const errorMessage = document.getElementById("error-message");
	errorMessage.textContent = `Something went wrong, try again. ${error} `;
	errorMessage.classList.add("error-message");
}

function hideErrorMessage() {
	const errorMessage = document.getElementById("error-message");
	errorMessage.classList.remove("error-message");
	errorMessage.textContent = "";
}
function addColorsToDivs(data) {
	let colorDiv = "";
	for (let i = 0; i < 5; i++) {
		const color = data.colors[i].hex.value;
		//check that we got a valid hex number from the API
		if (!/^#[0-9a-f]{6}$/i.test(color)) {
			throw new Error("The API returned an invalid color");
		}

		colorDiv += `<div style="background-color:${color};" class="color-div">
        <p class="color-code">${color}</p>
        </div>`;
	}
	document.querySelector(".colors-container").innerHTML = colorDiv;
}

form.addEventListener("submit", async function (e) {
	e.preventDefault();
	let color = selectedColor.value.slice(1);
	if (color === lastGeneratedColor) return;
	await generatePalette(color);
});

window.addEventListener("load", async function () {
	const color = initialColor();
	selectedColor.value = `#${color}`;
	await generatePalette(color);
});

async function generatePalette(color) {
	hideErrorMessage();
	if (isLoading) return;
	isLoading = true;
	const button = document.querySelector("#submit-button");
	button.disabled = true;
	button.classList.add("disabled");
	renderLoader();
	const scheme = select.value;
	try {
		await fetchColors(color, scheme);
	} finally {
		isLoading = false;
		button.disabled = false;
		hideLoader();
		button.classList.remove("disabled");
	}
}
