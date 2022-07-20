/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('entries-local-storage');

if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}
window.addEventListener('beforeunload', beforeUnFun);

function beforeUnFun(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('entries-local-storage', entriesJSON);
}

function singleEntry(entry) {

  var listItemEl = document.createElement('li');
  listItemEl.className = 'list-item entry';

  var imgOfList = document.createElement('img');
  imgOfList.className = 'photo';
  imgOfList.setAttribute('src', entry.url);
  listItemEl.appendChild(imgOfList);

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

function appendToData() {
  for (var i = 0; i < data.entries.length; i++) {
    var newListItem = singleEntry(data.entries[i]);
    listUl.appendChild(newListItem);
  }
  // console.log(data.entries);
  // // return newListItem;
}
window.addEventListener('DOMContentLoaded', appendToData);
