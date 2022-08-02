/* 
    TASK 1

    Дан объект : 

    const car = {
        company : 'Toyota',
        model : 'Land Cruser',
        doors : 5,
        color : 'white'
    }

    Необходимо преобразовать данный объект в формат JSON , и потом обратно.
    Запишите оба результата в переменную и выведите их значения в консоль.

*/

const car = {
    company : 'Toyota',
    model : 'Land Cruser',
    doors : 5,
    color : 'white'
}

const carStr = JSON.stringify(car);
// console.log(carStr);
const result = JSON.parse(carStr);
// console.log(result);

/* 
    TASK 2

    Воспользуйтесь free REST API: https://jsonplaceholder.typicode.com/ для получения 
    100 albums. И выведите все альбомы на html страницу в виде : 

    UserId : значение userId с пришедшего вам объекта,
    Id : значение Id с пришедшего вам объекта,
    Title : значение title с пришедшего вам объекта

    В итоге на вашей странице должно распарситься 100 разных альбомов. 

*/

const btnUser = document.querySelector('.btn__user');
const btnId = document.querySelector('.btn__id');
const btnTitle = document.querySelector('.btn__title');
const albums = document.querySelector('.albums');
const btnAlbums = document.querySelector('.btn__albums')

const getAlbums = succesRequired => {
  const xhr = new XMLHttpRequest();
  const url = 'https://jsonplaceholder.typicode.com/albums';
  xhr.open('GET', url);
  xhr.addEventListener('load', () => {
    succesRequired(JSON.parse(xhr.response));
  });
  xhr.addEventListener('error', () => {
    console.log('Произошла ошибка');
  });
  xhr.send();
};

const domStyle = () => {
    albums.style.display = 'flex';
    albums.style.flexWrap = 'wrap';
    albums.style.width = '500px';
    albums.style.marginTop = '10px';
}

const getAlbumsUserId = response => {
    domStyle();
    response.forEach((item, idx) => {
        if(idx < response.length - 1) {
            albums.innerHTML += `
            <div>UserId: ${item.userId},&nbsp</div>
        `
        }else {
            albums.innerHTML += `
            <div>UserId: ${item.userId}.&nbsp</div>
        `
        }
    });
};

const getAlbumsId = response => {
    domStyle();
    response.forEach((item, idx) => {
        if(idx < response.length - 1) {
            albums.innerHTML += `
            <div>Id: ${item.id},&nbsp</div>
        `
        }else {
            albums.innerHTML += `
            <div>Id: ${item.id}.&nbsp</div>
        `
        }
    });
};

const getAlbumsTitle = response => {
    domStyle();
    response.forEach(item => {
            albums.innerHTML += `
            <div>Title: ${item.title}.&nbsp</div>
        `
    });
};

const $getAlbums = response => {
    domStyle();
    response.forEach(item => {
        albums.innerHTML += `
            <div>UserId: ${item.userId}, Id: ${item.id}, Title: ${item.title}.</div>
        `
    });
};

btnUser.addEventListener('click', () => {
    getAlbums(getAlbumsUserId);
});

btnId.addEventListener('click', () => {
    getAlbums(getAlbumsId);
});

btnTitle.addEventListener('click', () => {
    getAlbums(getAlbumsTitle);
});

btnAlbums.addEventListener('click', () => {
    getAlbums($getAlbums);
});
