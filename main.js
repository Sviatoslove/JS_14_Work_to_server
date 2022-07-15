/* 

Все задания выполнять с учетом синтаксиса стандарта ES6

    TASK 1

    Перепишите данные функции на стрелочные: 

    function multiplication( num ) {
        return num * 2
    };

    function printName( firstName, lastName ) {
        console.log(firstName + ' ' + lastName);
    };

    function printMyOwnAge(age) {
        console.log(age);
    };


*/

const multiplication = num => num * 2;

const printName = (firstName, lastName) => console.log(`${firstName} ${lastName}`);

const printMyOwnAge = age => console.log(age);


/*
    TASK 2

    Напишите функцию sumArgs(n), которая вернёт другую функцию. 
    Возвращенная функция должна складывать получаемый аргумент 
    с аргументом n возвращающей функции. 

*/

const sumArgs = n => () => console.log(n + n);

let result = sumArgs(5);
// result();
 

/* 
    TASK 3

    Напишите функцию convertWord(),  
    которая в зависимости от переданного в нее числа n,
    будет выводить слово "повар" в нужной форме 
    ("12 поваров", но "22 повара"). 
    Если число не передали, выводите "0 поваров"

*/

const convertWord = (n = 0) => {
  n % 100 / 10 === 1 ? console.log(`${n} Поваров`):
  n % 10 === 1 && n !== 11 ? console.log(`${n} Повар`):
  n % 10 === 2 && n !== 12 || n % 10 === 3 && n !== 13 || n % 10 === 4 && n !== 14 ? console.log(`${n} Повара`):
  console.log(`${n} Поваров`);
};

// convertWord();