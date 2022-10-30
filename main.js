
const requestUrl = 'https://jsonplaceholder.typicode.com/photos';
const photosWrapper = document.querySelector('.photos__wrapper');
const btnCreate = document.querySelector('.btnCreate');
const btnUpdate = document.querySelector('.btnUpdate');
const title = document.querySelector('.title');

function getBtnGet() {
  if(document.querySelectorAll('.button').length === 2 && photosWrapper.children.length === 0) {
    const btnGet = document.createElement('div');
    btnGet.classList.add('btnGet', 'button');
    btnGet.innerHTML = 'Get 10 photos';
    btnCreate.after(btnGet);
    btnGet.addEventListener('click', e => {
      e.preventDefault();
      checkClick += 1;
      getPhotos(requestUrl, checkClick - 1);
    });
  }else if(photosWrapper.children.length === 1) {
    btnGet.remove();
    getBtnGet();
  }
};

getBtnGet();

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
        return dozen > 0 ? item.id >= dozen * 10 + 1 && item.id <= (dozen * 10) + 10 : item.id >= dozen && item.id <= dozen + 10;
      }).forEach(photo => {
        photosWrapper.innerHTML += createTemplate(photo);
      });
    })
    .then(() => {
      getTitle();
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

function getTitle() {
  if(photosWrapper.children.length > 1) {
    title.classList.add('active');
  }else {
    title.classList.remove('active');
  };
};

const deletePhotoServer = (url, id) => {
  fetch(url + '/' + id, {
    method: 'DELETE',
  });
};

const deletePhoto = url => {
  btnsDelete = document.querySelectorAll('.btn__delete');
  for (const elem of btnsDelete) {
    elem.addEventListener('click', e => {
      const idElem = e.target.parentNode.dataset.id;
      e.target.parentNode.remove();
      deletePhotoServer(url, idElem);
      getTitle();
      getBtnGet();
    });
  };
};

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
      photosWrapper.append(btnGet);
    })
    .then(() => {
      deletePhoto(url);
    });
    document.querySelector('.albumIdAdd').value = ''
    document.querySelector('.titleAdd').value = ''
    document.querySelector('.urlAdd').value = ''
    document.querySelector('.thumbnailUrlAdd').value = ''
};

btnCreate.addEventListener('click', e => {
  e.preventDefault();
  title.classList.add('active');
  btnGet.remove();
  createPhoto(requestUrl);
  if(document.querySelectorAll('.button')[1].classList.contains('btnGet')) {
    document.querySelectorAll('.button')[1].remove();
  }
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
      document.querySelector('.albumIdUpdate').value = ''
      document.querySelector('.idPhotoUpdate').value = ''
      document.querySelector('.titleUpdate').value = ''
      document.querySelector('.urlUpdate').value = ''
      document.querySelector('.thumbnailUrlUpdate').value = ''
    });
};

btnUpdate.addEventListener('click', e => {
  e.preventDefault();
  getTitle();
  updatePhoto(requestUrl);
});