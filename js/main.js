var elImgURL = document.querySelector('.photo');
var elPhotoUpl = document.querySelector('#photo-url');
elPhotoUpl.addEventListener('input', photoUpload);

function photoUpload(event) {
  elImgURL.setAttribute('src', event.target.value);
}
