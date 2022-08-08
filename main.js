/* 
    Необходимо найти FREE REST API в просторах интернета. 

    Пускай эта FREE REST API сможет дать вам полный CRUD (Create, Read, Update, Delete)

    При проверке домашнего задания наставник должен иметь возможность увидеть список
    полученных данных с сервера на html странице.
    
    Так же с нее он должен иметь возможность удалить запись, создать новую,
    или же обновить запись.
*/

const requestUrl = 'https://jsonplaceholder.typicode.com/photos';
const photosWrapper = document.querySelector('.photos__wrapper');
const btnCreate = document.querySelector('.btnCreate');
const btnUpdate = document.querySelector('.btnUpdate');

let btnsDelete;
let photos = [];

const createTemplate = data => {
  return template = `
    <div class="wrapper__post" data-id="${data.id}">
        <div class="albumId">AlbumId: ${data.albumId}</div>
        <div class="id">ID: ${data.id}</div>
        <div class="title">Title: ${data.title}</div>
        <div class="url">Url: ${data.url}</div>
        <div class="thumbnailUrl">ThumbnailUrl: ${data.thumbnailUrl}</div>
        <button class="btn__delete">Delete post</button>
    </div>
  `
};

const getPhotos = url => {
  fetch(url)
    .then(response => response.json())
    .then(json => {
        photos = json;
        photos.filter(item => {
        return item.id >= 50 && item.id <= 60;
      }).forEach(photo => {
        photosWrapper.innerHTML += createTemplate(photo);
      });
      btnsDelete = document.querySelectorAll('.btn__delete');
    })
    .then(() => {
      for (const elem of btnsDelete) {
        elem.addEventListener('click', e => {
          const idElem = e.target.parentNode.dataset.id;
          deletePhoto(requestUrl, idElem);
        })
      }
    })
};

const deletePhoto = (url, id) => {
  fetch(url + '/' + id, {
    method: 'DELETE'
  })
};

getPhotos(requestUrl);

const createPhoto = url => {
  let inputAlbumId = document.querySelector('.albumIdAdd').value;
  let inputTitle = document.querySelector('.titleAdd').value;
  let inputUrl = document.querySelector('.urlAdd').value;
  let inputThumbnailUrl = document.querySelector('.thumbnailUrlAdd').value;
  let createObj = {
    albumId: inputAlbumId,
    title: inputTitle,
    url: inputUrl,
    thumbnailUrl: inputThumbnailUrl
  }
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(createObj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

btnCreate.addEventListener('click', e => {
  e.preventDefault();
  createPhoto(requestUrl);
})

const updatePhoto = url => {
  let inputAlbumIdUpdate = document.querySelector('.albumIdUpdate').value;
  let inputTitleUpdate = document.querySelector('.titleUpdate').value;
  let inputUrlUpdate = document.querySelector('.urlUpdate').value;
  let inputThumbnailUrlUpdate = document.querySelector('.thumbnailUrlUpdate').value;
  let inputIdPhotoUpdate = document.querySelector('.idPhotoUpdate').value;
  fetch(url + '/' + inputIdPhotoUpdate, {
    method: 'PUT',
    body: JSON.stringify({
        albumId: inputAlbumIdUpdate,
        id: inputIdPhotoUpdate,
        title: inputTitleUpdate,
        url: inputUrlUpdate,
        thumbnailUrl: inputThumbnailUrlUpdate,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

btnUpdate.addEventListener('click', e => {
  e.preventDefault();
  updatePhoto(requestUrl);
})