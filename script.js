fetch("https://www.thecolorapi.com/scheme?hex=FFF56F&mode=triad&count=3")
	.then((res) => res.json())
	.then(function Lala(data) {
		((document.querySelector("#onediv").style.backgroundColor =
			data.colors[0].hex.value),
			(document.querySelector("#seconddiv").style.backgroundColor =
				data.colors[1].hex.value),
			(document.querySelector("#thirddiv").style.backgroundColor =
				data.colors[2].hex.value));
	});
