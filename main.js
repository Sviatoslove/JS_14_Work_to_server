const engInput = document.querySelector('.input-eng');
const rusInput = document.querySelector('.input-rus');
const inputs = document.querySelectorAll('.inputs');
const saveButton = document.querySelector('.btn');
const table = document.querySelector('.table');

let words;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

let addWordToTable = index => {
    table.innerHTML += `
        <tr>
            <td>
            ${words[index].englishWord}
            </td>
            <td>
            ${words[index].russianWord}
            </td>
            <td class="delete">
            ❌
            </td>
        </tr>
    `
};

const getWordsLength = () => {
    words.forEach((item, idx) => {
        addWordToTable(idx);
    })
}

getWordsLength();

class CreateWord {
    constructor(englishWord, russianWord) {
        this.englishWord = englishWord;
        this.russianWord = russianWord;
    };
};

const enterButton = () => {
    if(
        rusInput.value.length < 1 ||
        engInput.value.length < 1 ||
        !isNaN(rusInput.value)    ||
        !isNaN(engInput.value)
    ) {
        for(let key of inputs) {
            key.classList.add('error');
        }
    } else {
        for(let key of inputs) {
            key.classList.remove('error');
        };
        words.push(new CreateWord(engInput.value, rusInput.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        rusInput.value = '';
        engInput.value = '';
    };
};

saveButton.addEventListener('click', () => {
    enterButton();
});

document.addEventListener('keydown', event => {
    if(event.keyCode === 13){
        enterButton();
    }
});

const deleteWord = () => {
    let deleteButtons = document.querySelectorAll('.delete');
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', () => {
            words.forEach((item, idx) => {
                if(idx === i) {
                    words.splice(idx, 1);
                    localStorage.setItem('words', JSON.stringify(words));
                    table.innerHTML = ``;
                    getWordsLength();
                };
            });
            deleteWord();
        });
    };
};

deleteWord();