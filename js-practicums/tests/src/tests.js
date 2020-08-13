export default [{
        question: 'Что не является HTML-тегом?',
        answers: ['<i></i>', '<b></b>', '<a></a>', '<c></c>'],
        answer: '',
        answerIsOk: false,
        trueAnswer: '<c></c>',
    },
    {
        question: 'Блочный элемент от строчного отличается тем что...',
        answers: [
            'Внутри нельзя размещать другой блочный элемент',
            'Ширина определяется контентом',
            'Не обязан начинаться с новой строки',
            'Занимает всю доступную ширину родителя',
        ],
        answer: '',
        answerIsOk: false,
        trueAnswer: 'Занимает всю доступную ширину родителя',
    },
    {
        question: 'Выберите верное описание поведения потока выполнения документа для европейских стран.',
        answers: [
            'Сверху вниз, слева направо и смена направления при переходе на новую строку',
            'Сверху вниз, справа налево',
            'Сверху вниз, слева направо',
            'Снизу вверх, справа налево',
        ],
        answer: '',
        answerIsOk: false,
        trueAnswer: 'Сверху вниз, слева направо',
    },
    {
        question: 'Какой тег может быть вложен непосредственно внутрь списков (ol и ul)?',
        answers: ['только строчные', 'только блочные теги', 'только li', 'любой'],
        answer: '',
        answerIsOk: false,
        trueAnswer: 'только li',
    },
    {
        question: 'Что не является атрибутом тега a?',
        answers: ['href', 'title', 'alt', 'target'],
        answer: '',
        answerIsOk: false,
        trueAnswer: 'alt',
    },
    {
        question: 'Какой из примеров кода пройдет валидацию?',
        answers: [
            '<img src = "" alt = "">',
            '<b>Hello <b>World!</b></b>',
            'Не один из примеров не пройдет валидацию',
            '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ratione, omnis eveniet deleniti, error earum blanditiis ullam doloribus repudiandae esse cumque corrupti perspiciatis sit rerum, sapiente nulla modi placeat aut?</p>',
        ],
        answer: '',
        answerIsOk: false,
        trueAnswer: '<img src = "" alt = "">',
    },
    {
        question: 'Может ли на странице быть больше одно тега h1?',
        answers: [
            'Да, HTML5 спецификация это позволяет.',
            'Да, HTML5 спецификация это позволяет, но это не рекомендуется.',
            'Нет, HTML5 спецификация этого не позволяет.',
        ],
        answer: '',
        answerIsOk: false,
        trueAnswer: 'Да, HTML5 спецификация это позволяет, но это не рекомендуется.',
    },
    {
        question: `Является ли следующая разметка валидной? <div>
        <p>
          <div>
          <p>
          </p>
        </p>
          </div>
      </div>`,
        answers: ['Да', 'Нет'],
        answer: '',
        answerIsOk: false,
        trueAnswer: 'Нет',
    },
    {
        question: 'Выберите валидный HTML комментрий:',
        answers: [
            '/* this is a comment */',
            '# this is a comment',
            '<!-- this is a comment -->',
            '// this is a comment',
        ],
        answer: '',
        answerIsOk: false,
        trueAnswer: '<!-- this is a comment -->',
    },
    {
        question: 'Какой из этих тегов не строчный?',
        answers: ['<a></a>', '<b></b>', '<i></i>', '<p></p>'],
        answer: '',
        answerIsOk: false,
        trueAnswer: '<p></p>',
    },
];