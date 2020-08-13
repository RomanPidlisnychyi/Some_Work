import './styles.css';
import tests from './tests';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/BrightTheme.css';

import questionTemplate from './questionTemplate.hbs';
import pasedTestTemplate from './pasedTestTemplate.hbs';
import totalScoreTemplate from './totalScoreTemplate.hbs';

import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';

let index = 0;
let newList;
let newAnswers;
let resalt = 0;
const answers = [];

const refs = {
    body: document.querySelector('body'),
    testList: document.querySelector('.js-testList'),
    startBtn: document.querySelector('button[name="start"]'),
    nextBtn: document.querySelector('button[name="next"]'),
};

refs.body.addEventListener('click', onStart);

function onStart(event) {
    if (event.target.nodeName === 'INPUT') {
        let answer = event.target.id;
        answers[index - 1].answer = answer;
        const nextBtn = document.querySelector('button[name="next"]');
        nextBtn.disabled = false;
    }
    if (event.target.nodeName === 'BUTTON') {
        if (event.target === refs.startBtn) {
            refs.startBtn.classList.add('highButton');
            newList = randomIndexInArr(tests);
        }

        if (answers.length < tests.length) {
            newAnswers = randomIndexInArr(tests[newList[index]].answers);
        }

        const question = tests[newList[index]];

        if (answers.length === tests.length) {
            console.log('test is finish!');
            refs.testList.innerHTML = '';
            refs.startBtn.classList.remove('highButton');
            index = 0;
            newList.length = 0;
            newAnswers.length = 0;
            const finishTest = answers.map((e, i, arr) => {
                e.score = 0;
                if (e.answer === e.trueAnswer) {
                    e.answerIsOk = true;
                    e.score = 100 / arr.length;
                }
                return e;
            });
            const totalScore = finishTest.forEach(e => {
                resalt += e.score;
            });
            refs.testList.insertAdjacentHTML('beforeend', totalScoreTemplate(resalt));
            refs.testList.insertAdjacentHTML(
                'beforeend',
                pasedTestTemplate(finishTest),
            );

            const p = document.querySelectorAll('p');

            finishTest.forEach((el, i) => {
                p.forEach((e, i) => {
                    if (e.id === 'totalScore') {
                        if (resalt >= 80) {
                            e.classList.add('success');
                        } else {
                            e.classList.add('unSuccess');
                        }
                    }
                    if (`${el.numberOfQuestion}${el.answer}` === e.id) {
                        if (el.answerIsOk) {
                            e.classList.add('success');
                        } else {
                            e.classList.add('unSuccess');
                        }
                    }
                });
            });
            tests.forEach(e => (e.answerIsOk = false));
            resalt = 0;
            answers.length = 0;

            return;
        }
        index += 1;
        question.answers = question.answers.map((e, i, arr) => {
            i = newAnswers[i];

            return arr[i];
        });
        question.numberOfQuestion = index;
        answers.push(question);
        refs.testList.innerHTML = '';
        refs.testList.insertAdjacentHTML('beforeend', questionTemplate(question));
    }
}

function generateNamber(arr) {
    const max = arr.length;
    let number = Math.floor(Math.random() * max);
    return number;
}

function randomIndexInArr(arr) {
    const numbers = [];

    while (numbers.length !== arr.length) {
        let number = generateNamber(arr);

        if (!numbers.includes(number)) {
            numbers.push(number);
        }
    }

    return numbers;
}