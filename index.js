const uploadForm = document.querySelector("#upload-form");
const uploadBtn = document.querySelector("#upload-btn");

uploadBtn.onclick = function(e) {

	const elements = Array.from(uploadForm.elements).filter(elem => elem.type === "file");
	
	const formData = new FormData();
	elements.forEach(elem => {
		formData.append(elem.name, elem.files[0]);
	});

	// create our own sample file
	function newSampleFile() {
		const parts = [
			new Blob(["hello world, how are you doing?"], { type: 'text/plain' }),
			' Same way as you do with blob',
			new Uint16Array([33])
		]
		const file = new File(parts, 'sample.txt', {
			lastModified: new Date(0),
			type: "overid/mimetype",
		});
		return file;
	}
	formData.append('mySample.txt', newSampleFile());

	fetch("/fileupload", {
		method: "post",
		headers: {
			contentType: 'multipart/form-data',
		},
		body: formData
	})
	.then(data => data.text())
	.then(data => console.log(data));
}

