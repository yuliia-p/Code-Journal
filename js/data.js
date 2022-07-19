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
