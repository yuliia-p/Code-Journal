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
  listUl.prepend(newEntryDom);
  if (data.editing !== null) {
    var editObj = {};
    editObj.title = data.editing.title;
    editObj.url = data.editing.url;
    editObj.notes = data.editing.notes;
    editObj.entryId = data.nextEntryId - 1;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === editObj.entryId) {
        data.entries[i].splice(i - 1, 1, editObj);
        var listsElements = document.querySelectorAll('li');
        for (var x = 0; x < listsElements.length; x++) {
          var toNumber = Number(listsElements[x].getAttribute('data-entry-id'));
          if (toNumber === editObj.entryId) {
            var replacedEntryDom = newEntryDom.replaceWith(editObj);
            listUl.prepend(replacedEntryDom);
          }
        }
      }
    }
    // } else {
    //   newObj.title = elEntryForm.elements.title.value;
    //   newObj.url = elEntryForm.elements.url.value;
    //   newObj.notes = elEntryForm.elements.notes.value;
    //   newObj.entryId = data.nextEntryId;
    //   data.entries.unshift(newObj);
    //   elImgURL.setAttribute('src', '/images/placeholder-image-square.jpg');
    //   switchView('entries');
    //   elEntryForm.reset();
    //   // var newEntryDom = singleEntry(newObj);
    //   listUl.prepend(newEntryDom);
    // }
    switchView('entries');
    elEntryForm.reset();
    data.editing = null;
  }
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

  if (event.target.matches('.icon')) {
    switchView('entry-form');
  }
  if (event.target.tagName === 'I') {
    var closestIl = event.target.closest('.list-item');
    var strAtribute = closestIl.getAttribute('data-entry-id');
    var numIdAtribute = Number(strAtribute);
    for (var x = 0; x < data.entries.length; x++) {
      if (numIdAtribute === data.entries[x].entryId) {
        data.editing = data.entries[x];
        elEntryForm.elements.title.value = data.editing.title;
        elEntryForm.elements.url.value = data.editing.url;
        elEntryForm.elements.notes.value = data.editing.notes;

      }
    }
  }
}
