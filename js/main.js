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

// var clickElements = document.querySelectorAll('.view');
// // 0: a#entries-button.view
// // 1: div#entry - form.view
// // 2: div#entries - view.view
// // 3: button.view.white - font - style.new - entries - button

// var allEntries = document.querySelector('#entries-button');
// var newEntryForm = document.querySelector('.new-entries-button');
// var saveButton = document.querySelector('.save-button');

document.addEventListener('click', click); //

function click(event) {
  // if (event.target.matches('.view')) {
  //   for (var i = 0; i < clickElements.length; i++) {
  //     if (clickElements[i] === event.target) {
  //       clickElements[i].className = 'view';
  // //     }
  // //   }
  // // }

  var dataViewEntries = document.querySelector('#entries-view'); // entries page
  var dataViewEntryForm = document.querySelector('#entry-form'); // entry-form page
  if (event.target.matches('#entries-button')) {
    dataViewEntryForm.className = 'view' + ' hidden';
    dataViewEntries.className = 'view';
  } else if (event.target.matches('.new-entries-button')) {
    dataViewEntries.className = 'view' + ' hidden';
    dataViewEntryForm.className = 'view';
  }
  // console.log(event.target.matches('#entries-button'));
  // console.log('event.target', event.target);
  // // var dataView = event.target.getAttribute('data-view');
  // console.log('dataViewEntryForm', dataViewEntryForm);
  // console.log(dataViewEntries);
  // console.log(clickElements);
}

// saveButton.addEventListener('submit', formSubmit) {
//   elEntryForm.appendChild(singleEntry(entry));
//   elEntryForm.reset();
// });
