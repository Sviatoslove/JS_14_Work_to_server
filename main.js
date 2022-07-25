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
    let z = n % 100 / 10;
    let x = n % 10;
    z >= 1.1 && z <= 1.4 ? console.log(`${n} Поваров`):
    x === 1 ? console.log(`${n} Повар`):
    x === 2 || x === 3 || x === 4 ? console.log(`${n} Повара`):
    console.log(`${n} Поваров`);
};
convertWord();
convertWord(1);
convertWord(2);
convertWord(3);
convertWord(4);
convertWord(5);
convertWord(6);
convertWord(7);
convertWord(8);
convertWord(9);
convertWord(10);
convertWord(11);
convertWord(12);
convertWord(13);
convertWord(14);
convertWord(15);
convertWord(16);
convertWord(17);
convertWord(18);
convertWord(19);
convertWord(20);
convertWord(21);
convertWord(22);
convertWord(23);
convertWord(24);
convertWord(25);
convertWord(26);
convertWord(27);
convertWord(28);
convertWord(29);
convertWord(30);
convertWord(31);
convertWord(32);
convertWord(33);
convertWord(34);
convertWord(35);
convertWord(36);
convertWord(100);
convertWord(101);
convertWord(102);
convertWord(103);
convertWord(104);
convertWord(105);
convertWord(106);
convertWord(999);
convertWord(111);
convertWord(112);
convertWord(1112);
convertWord(1113);
convertWord(1114);
convertWord(1115);
convertWord(1116);
convertWord(10000);
convertWord(10001);
convertWord(10002);
convertWord(10003);
convertWord(10004);
convertWord(10005);
convertWord(1000000);
convertWord(1111111);
convertWord(1111112);
convertWord(1001015);