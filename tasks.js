"use strict";

const Module = (function () {
    const MIN_NUMBER = 0;
    const CODE_FOR_LETTER = 96;
    const ONE_ELEMENT = 1;
    const NUMBER_FOR_INDEX = 1;
    const NUMBER_LETTERS_ALPHABET = 26;
    const DEGREE_FOR_SQUARE = 2;
    const NUMBER_FOR_REST = 10;
    let myModule = {};
    myModule.firstExample = {};
    myModule.secondExample = {};
    myModule.thirdExample = {};

    function checkArray(firstArr, secondArr) {
        let result = [firstArr, secondArr]
        if (!(Array.isArray(firstArr) && Array.isArray(secondArr))) {
            result = [[], []];
        }
        return result;
    }

    function checkStr(str) {
        let result = typeof str === "string" ? str.toLowerCase() : '';
        return result;
    }

    myModule.firstExample.arrayDiff = function(a, b) {
        let [firstArr, secondArr] = checkArray(a, b);
        let firstIndex = firstArr.length - ONE_ELEMENT;
        for (let i = firstIndex; i >= MIN_NUMBER; i--) {
            if(secondArr.includes(firstArr[i])) {
                firstArr.splice(i, ONE_ELEMENT);
            }
        }
        return firstArr;
    };

    myModule.secondExample.arrayDiff = function(a, b) {
        let [firstArr, secondArr] = checkArray(a, b);
        firstArr = firstArr.filter(element => !secondArr.includes(element));
        return firstArr;
    };

    myModule.thirdExample.arrayDiff = function(a, b) {
        let [firstArr, secondArr] = checkArray(a, b);
        let result = [];
        firstArr.forEach(element => {
            if(!secondArr.includes(element)) {
                result.push(element);
            }
        });
        firstArr = result;
        return firstArr;
    };

    myModule.firstExample.alphabetPosition = function(str) {
        const lowerStr = checkStr(str);
        const length = lowerStr.length;
        let result = "";
        for (let i = MIN_NUMBER; i < length; i++) {
            let code = lowerStr[i].charCodeAt(MIN_NUMBER) - CODE_FOR_LETTER;
            if (code > MIN_NUMBER) {
                result += `${code} `
            }
        }
        return result.trim();
    };

    myModule.secondExample.alphabetPosition = function(str) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const lowerStr = checkStr(str);
        const length = lowerStr.length;
        let result = [];
        for (let i = MIN_NUMBER; i < length; i++) {
            let index = letters.findIndex(letter => letter === lowerStr[i]) + NUMBER_FOR_INDEX;
            if (index > MIN_NUMBER) {
                result.push(index);
            }
        }
        return result.join(' ');
    };

    myModule.thirdExample.alphabetPosition = function(str) {
        const lowerStr = checkStr(str);
        const length = lowerStr.length;
        let result = "";
        let letters = {};
        for (let i = ONE_ELEMENT; i <=NUMBER_LETTERS_ALPHABET; i++) {
            letters[`${String.fromCodePoint(CODE_FOR_LETTER+i)}`] = i;
        }
        for (let i = MIN_NUMBER; i < length; i++) {
            if (letters[lowerStr[i]]) {
                result += `${letters[lowerStr[i]]}`;
                if (i !== length - ONE_ELEMENT) {
                    result += ' ';
                }
            }
        }
        return result;
    };

    myModule.firstExample.squareEveryDigit = function(number) {
        let result = MIN_NUMBER;
        let arrNumber = [];
        if (isFinite(number)) {
            arrNumber = `${number}`.split('');
            result = arrNumber.map(num => num*num).join('');
        }
        return Number(result);
    }

    myModule.secondExample.squareEveryDigit = function(number) {
        let result = MIN_NUMBER;
        let rest = MIN_NUMBER;
        if (isFinite(number)) {
            while (number > MIN_NUMBER) {
                rest = number % NUMBER_FOR_REST;
                number = (number - rest) / NUMBER_FOR_REST;
                result += String(rest * rest);
            }
        }
        return +result;
    }

    myModule.thirdExample.squareEveryDigit = function(number, degree) {
        let result = MIN_NUMBER;
        degree = degree || DEGREE_FOR_SQUARE;
        if (isFinite(number)) {
            result = [...number+''].map(num => Math.pow(num, degree)).join('');
        }
        return result - 0;
    }

    return myModule;
})();

console.log(Module.firstExample.arrayDiff([1,2],[1]));
console.log(Module.firstExample.arrayDiff([1,2,2,2,3],[2]));
console.log(Module.firstExample.arrayDiff([1,2,2,2,3],[2, 9, 99, -1]));

console.log(Module.secondExample.arrayDiff([1,2],[1]));
console.log(Module.secondExample.arrayDiff([1,2,2,2,3],[2]));
console.log(Module.secondExample.arrayDiff([1,2,2,2,3],[2, 9, 99, -1]));

console.log(Module.thirdExample.arrayDiff([1,2],[1]));
console.log(Module.thirdExample.arrayDiff([1,2,2,2,3],[2]));
console.log(Module.thirdExample.arrayDiff([1,2,2,2,3],[2, 9, 99, -1]));

console.log(Module.firstExample.alphabetPosition("The sunset sets at twelve o' clock."));
console.log(Module.secondExample.alphabetPosition("The sunset sets at twelve o' clock."));
console.log(Module.thirdExample.alphabetPosition("The sunset sets at twelve o' clock."));

console.log(Module.firstExample.squareEveryDigit(9119));
console.log(Module.firstExample.squareEveryDigit(323));
console.log(Module.firstExample.squareEveryDigit(101));

console.log(Module.secondExample.squareEveryDigit(9119));
console.log(Module.secondExample.squareEveryDigit(323));
console.log(Module.secondExample.squareEveryDigit(101));

console.log(Module.thirdExample.squareEveryDigit(9119));
console.log(Module.thirdExample.squareEveryDigit(323));
console.log(Module.thirdExample.squareEveryDigit(101));