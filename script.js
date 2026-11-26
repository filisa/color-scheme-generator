let selectedColor = document.getElementById("choose-color");

const form = document.getElementById("choose-color-and-scheme-form");
const select = document.getElementById("choose-scheme");
let isLoading = false;

async function fetchColors(color, scheme) {
	try {
		const response = await fetch(
			`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=5`
		);
		if (!response.ok) {
			throw new Error("error! code" + response.status);
		}
		const data = await response.json();
		addColorsToDivs(data);
	} catch (error) {
		renderErrorMessage(error);
		console.log(error);
	}
}

function renderLoader() {
	const header = document.querySelector("#header");
	const loadingMessage = document.createElement("p");
	loadingMessage.textContent = "Loading...";
	loadingMessage.classList.add("loading-message");
	header.appendChild(loadingMessage);
}

function hideLoader() {
	document
		.querySelector("#header")
		.removeChild(document.querySelector(".loading-message"));
}
function renderErrorMessage(error) {
	const header = document.querySelector("#header");
	const errorMessage = document.createElement("p");
	errorMessage.textContent = `Something went wrong, try again. ${error} `;
	errorMessage.classList.add("error-message");
	header.appendChild(errorMessage);
	setTimeout(function () {
		header.removeChild(errorMessage);
	}, 800);
}
function addColorsToDivs(data) {
	let colorDiv = "";
	for (let i = 0; i < 5; i++) {
		let color = data.colors[i].hex.value;
		colorDiv += `<div style="background-color:${color};" id="${color}" class="color-div">
        <p class="color-code">${color}</p>
        </div>`;
	}
	document.querySelector(".colors-container").innerHTML = colorDiv;
}

form.addEventListener("submit", async function (e) {
	e.preventDefault();
	if (isLoading) return;
	isLoading = true;
	const button = document.querySelector("#submit-button");
	button.disabled = true;
	button.classList.toggle("disabled");
	renderLoader();
	const color = selectedColor.value.slice(1);
	const scheme = select.value;
	try {
		await fetchColors(color, scheme);
	} finally {
		isLoading = false;
		button.disabled = false;
		hideLoader();
		button.classList.remove("disabled");
	}
});
