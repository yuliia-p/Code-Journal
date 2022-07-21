/* eslint-disable no-unused-vars */
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
  switchView('entries');
  elEntryForm.reset();
  var newEntryDom = singleEntry(newObj);
  newEntryDom.setAttribute('data-entry-id', newObj.entryId);
  listUl.prepend(newEntryDom);

  // console.log('newDomEntr: ', newEntryDom);// is given a data-entry-id attribute indicating which entry it is.
  // console.log('new entry id for obj: ', newObj.entryId);
  // console.log('new Obj: ', newObj);

}

var viewElements = document.querySelectorAll('.view');

function switchView(viewName) {
  for (var x = 0; x < viewElements.length; x++) {
    if (viewElements[x].getAttribute('data-view') === viewName) {
      viewElements[x].className = 'view';
    } else {
      viewElements[x].className = 'view hidden';
    }
  }
  data.view = viewName;
}
var viewAllEntries = document.querySelector('#entries-a');
var newEntryForm = document.querySelector('.new-entries-button');
var saveButton = document.querySelector('.save-button');

viewAllEntries.addEventListener('click', clickToChange);
newEntryForm.addEventListener('click', clickToChange);

function clickToChange(event) {
  if (event.target.matches('#entries-a')) {
    switchView('entries');
  } else if (event.target.matches('.new-entries-button')) {
    switchView('entry-form');
  } else if (event.target.matches('.save-button')) {
    switchView('entries');
  }
}

function singleEntry(entry) {
  var listItemEl = document.createElement('li');
  listItemEl.setAttribute('data-entry-id', entry.entryId);
  listItemEl.className = 'list-item entry';

  var imgOfList = document.createElement('img');
  imgOfList.className = 'photo';
  imgOfList.setAttribute('src', entry.url);
  listItemEl.appendChild(imgOfList);

  var iconOfList = document.createElement('i');
  iconOfList.className = 'icon';
  iconOfList.setAttribute('class', 'fa-solid fa-pen icon');
  listItemEl.appendChild(iconOfList);

  var headerOfList = document.createElement('h3');
  var h3 = document.createTextNode(entry.title);
  headerOfList.appendChild(h3);
  listItemEl.appendChild(headerOfList);

  var textOfList = document.createElement('p');
  var paragraph = document.createTextNode(entry.notes);
  textOfList.appendChild(paragraph);
  listItemEl.appendChild(textOfList);

  return listItemEl;
}

var listUl = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', appendToData);

function appendToData() {
  for (var i = 0; i < data.entries.length; i++) {
    var newListItem = singleEntry(data.entries[i]);
    listUl.appendChild(newListItem);
  }
  switchView(data.view);
}

var iconEl = document.querySelector('.icon');

listUl.addEventListener('click', clickUl);

function clickUl(event) {
  // debugger;

  if (event.target.matches('.icon')) {
    switchView('entry-form');
  }
  var listsElements = document.querySelectorAll('li');
  for (var i = 0; i < listsElements.length; i++) {
    for (var x = 0; x < data.entries.length; x++) {
      var strAtribute = listsElements[i].getAttribute('data-entry-id');
      var numIdAtribute = Number(strAtribute);
    } if (numIdAtribute === data.entries[x].entryId) {
      data.editing = listsElements[i];
    }
  }
}

//     for (var x = 0; x < data.?.length; x++) {

//     }

//     if (numIdAtribute === entry[x].entryId) {
//     // if so assign it to the data model's editing property
//       data.editing = listsElements[i]; // ?? not sure
//     }
//   }
// }
// Find the matching entry object in the data model
// listsElements.getAttribute('data-entry-id')
// var data = {
// view: 'entry-form',
// entries: [],
// editing: null,
// nextEntryId: 1
//  listsElements.getAttribute('data-entry-id') ==> to number
//   var
//   if (listsElements.getAttribute('data-entry-id') === data.entries) {
