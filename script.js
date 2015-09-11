window.addEventListener('DOMContentLoaded', function() {
	/**
	 * DOM elements
	 */
	var btnClear = document.querySelector('#btnClear');
	var chbLS = document.querySelector('#chbLS');
	var fileChooser = document.querySelector('#fileChooser');
	var btnLoadImage = document.querySelector('#btnLoadImage');
	var imgHolder = document.querySelector('#imgHolder');
	var txtImgData = document.querySelector('#txtImgData');
	/**
	 * functions
	 */
	function createImgAndAdd(srcData, saveImg) {
		txtImgData.innerText = srcData;
		if (saveImg) window.localStorage.setItem('imgData', srcData);
		// generate img
		var img = document.createElement('img');
		img.style.height = '200px';
		img.style.width = '200px';
		img.src = srcData;
		// add img to div
		imgHolder.innerHTML = img.outerHTML;
	}

	function encodeImageFileAsUrl() {
		// get selected files
		var fileSelected = fileChooser.files;
		if (fileSelected.length > 0) {
			// get specific file
			var fileToLoad = fileSelected[0];
			// create file reader
			var fileReader = new FileReader();
			// create load listener
			fileReader.onload = function(e) {
				// data: base64
				var srcData = e.target.result;
				createImgAndAdd(srcData, true);
			}
			// register listener
			fileReader.readAsDataURL(fileToLoad);
		}
	}

	function decodeUrlAsImageFile() {
		var srcData = window.localStorage.getItem('imgData');

		if (srcData === null) {
			txtImgData.innerText = 'no image saved!'
		} else {
			createImgAndAdd(srcData, false);
		}
	}

	function clearMe() {
		fileChooser.value = '';
		imgHolder.innerHTML = '';
		txtImgData.innerText = 'Placeholder';
		if (chbLS.checked) window.localStorage.removeItem('imgData');
	}
	/**
	 * eventlistener
	 */
	fileChooser.addEventListener('change', function() {
		encodeImageFileAsUrl();
	});

	btnLoadImage.addEventListener('click', function() {
		decodeUrlAsImageFile();
	});

	btnClear.addEventListener('click', function() {
		clearMe();
	});
});