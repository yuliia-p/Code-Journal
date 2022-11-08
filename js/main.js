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

  if (!data.editing) {
    var newObj = {
      title: elEntryForm.elements.title.value,
      url: elEntryForm.elements.url.value,
      notes: elEntryForm.elements.notes.value,
      entryId: data.nextEntryId++
    };

    data.entries.unshift(newObj);

    switchView('entries');
    elEntryForm.reset();
    var newEntryDom = singleEntry(newObj);
    listUl.prepend(newEntryDom);
  } else {
    var editObj = {
      title: elEntryForm.elements.title.value,
      url: elEntryForm.elements.url.value,
      notes: elEntryForm.elements.notes.value,
      entryId: data.editing.entryId
    };

    // UPDATE DATA: find edited element in data entries and assign it new values
    for (var x = 0; x < data.entries.length; x++) {
      if (data.editing.entryId === data.entries[x].entryId) {
        data.entries.splice(x, 1, editObj);
      // }
      }
    }

    // UPDATE LI: find li and replace it with new dom element
    switchView('entries');
    var listsElements = document.querySelectorAll('li');
    var entryDom = singleEntry(editObj);
    for (var i = 0; i < listsElements.length; i++) {
      if (Number(listsElements[i].getAttribute('data-entry-id')) === editObj.entryId) {
        var newDom = singleEntry(editObj);
        listsElements[i].replaceWith(newDom);
      }
    }
    elImgURL.setAttribute('src', '/images/placeholder-image-square.jpg');
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

  var headerOfList = document.createElement('h3');
  var h3 = document.createTextNode(entry.title);
  headerOfList.appendChild(h3);
  listItemEl.appendChild(headerOfList);

  var iconOfList = document.createElement('i');
  iconOfList.className = 'icon';
  iconOfList.setAttribute('class', 'fa-solid fa-pen icon');
  headerOfList.appendChild(iconOfList);

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

listUl.addEventListener('click', clickUl);

function clickUl(event) {
  var imgEl = document.querySelector('.photo');
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
        imgEl.setAttribute('src', data.editing.url);
        elEntryForm.elements.notes.value = data.editing.notes;
      }
    }
  }
}
