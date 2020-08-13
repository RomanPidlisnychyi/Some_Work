function murkup(finishTest) {
    const markup = finishTest.
    `<fieldset>
    <legend>Question ${this.numberOfQuestion}:<br>${question}</legend>
    <ul>
        {{#each answers}}
        <li>
            <input type="radio" id="{{this}}" name="answer"/>
            <label for="{{this}}">{{this}}</label>
        </li>
        {{/each}}
    </ul>
</fieldset>
`;
}