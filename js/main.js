var elImgURL = document.querySelector('.photo');
var elPhotoUpl = document.querySelector('#photo-url');

elPhotoUpl.addEventListener('input', photoUpload);

function photoUpload(event) {
  elImgURL.setAttribute('src', event.target.value);
}

var elEntryForm = document.querySelector('#journal-form');

elEntryForm.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();
  var newObj = {};
  newObj.title = elEntryForm.elements.title.value;
  newObj.url = elEntryForm.elements.url.value;
  newObj.notes = elEntryForm.elements.notes.value;
  newObj.entryId = data.nextEntryId++;
  data.entries.unshift(newObj);
  elImgURL.setAttribute('src', '/images/placeholder-image-square.jpg');
  elEntryForm.reset();

}

// var entries = [];
