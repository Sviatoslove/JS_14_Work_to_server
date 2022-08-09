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
const btnGet = document.querySelector('.btnGet');

let btnsDelete;
let photos = [];
let checkClick = 0;

const createTemplate = (data) => {
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

const getPhotos = (url, dozen) => {
  fetch(url)
    .then(response => response.json())
    .then(json => {
        photos = json;
        photos.filter(item => {
        return dozen > 0 ? item.id >= dozen * 10 + 1 && item.id <= (dozen * 10) + 10 : item.id >= dozen && item.id <= dozen + 9;
      }).forEach(photo => {
        photosWrapper.innerHTML += createTemplate(photo);
      });
    })
    .then(() => {
      photosWrapper.append(btnGet);
      let btnsGet = document.querySelectorAll('.btnGet');
      btnsGet.forEach(item => {
        if(btnsGet.length > 1) {
          btnsGet[0].remove();
        };
      });
      deletePhoto(requestUrl);
    });
};

const deletePhotoServer = (url, id) => {
  fetch(url + '/' + id, {
    method: 'DELETE'
  });
};

const deletePhoto = url => {
  btnsDelete = document.querySelectorAll('.btn__delete');
  for (const elem of btnsDelete) {
    elem.addEventListener('click', e => {
      const idElem = e.target.parentNode.dataset.id;
      e.target.parentNode.remove();
      deletePhotoServer(url, idElem);
    });
  };
};

btnGet.addEventListener('click', e => {
  e.preventDefault();
  checkClick += 1;
  getPhotos(requestUrl, checkClick - 1);
});

const createPhoto = url => {
  let createObj = {
    albumId: document.querySelector('.albumIdAdd').value,
    title: document.querySelector('.titleAdd').value,
    url: document.querySelector('.urlAdd').value,
    thumbnailUrl: document.querySelector('.thumbnailUrlAdd').value
  }
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(createObj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      photosWrapper.innerHTML += createTemplate(json);
    })
    .then(() => {
      deletePhoto(url);
    });
};

btnCreate.addEventListener('click', e => {
  e.preventDefault();
  createPhoto(requestUrl);
})

const updatePhoto = url => {
  let inputIdPhotoUpdate = document.querySelector('.idPhotoUpdate').value;
  fetch(url + '/' + inputIdPhotoUpdate, {
    method: 'PUT',
    body: JSON.stringify({
        albumId: document.querySelector('.albumIdUpdate').value,
        id: inputIdPhotoUpdate,
        title: document.querySelector('.titleUpdate').value,
        url: document.querySelector('.urlUpdate').value,
        thumbnailUrl: document.querySelector('.thumbnailUrlUpdate').value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let arrPhotos = document.querySelectorAll('.wrapper__post');
      for(const photo of arrPhotos) {
        if(json.id === (+ photo.dataset.id)) {
          photo.children[0].innerHTML = document.querySelector('.albumIdUpdate').value;
          photo.children[2].innerHTML = document.querySelector('.titleUpdate').value;
          photo.children[3].innerHTML = document.querySelector('.urlUpdate').value;
          photo.children[4].innerHTML = document.querySelector('.thumbnailUrlUpdate').value;
        };
      };
    });
};

btnUpdate.addEventListener('click', e => {
  e.preventDefault();
  updatePhoto(requestUrl);
});