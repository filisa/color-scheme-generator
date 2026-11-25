let selectedColor = document.getElementById("choose-color");

document
	.getElementById("choose-color")
	.addEventListener("change", async function () {
		const color = selectedColor.value.slice(1);
		await fetchColors(color);
	});

async function fetchColors(color) {
	try {
		fetch(`https://www.thecolorapi.com/scheme?hex=${color}`)
			.then((res) => res.json())
			.then((data) => console.log(data));
	} catch (error) {
		console.log(error);
	}
}

function addColorsToDivs() {}
