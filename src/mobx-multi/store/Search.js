import { makeAutoObservable } from "mobx";

const MIN_TOP = 150;

class Search {
    value = '';
    oldValue = '';
    result = [];
    indexResult = 0;
    isSearch = false;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.onInput = this.onInput.bind(this);
        this.searchText = this.searchText.bind(this);
        this.nextResult = this.nextResult.bind(this);
        this.prevResult = this.prevResult.bind(this);
    }

    onInput(event) {
        this.value = event.target.value;
        if (!this.value.trim()) {
            this.isSearch = false;
        }
    }

    nextResult() {
        this.indexResult++;
        if (this.indexResult === this.result.length) {
            this.indexResult = 0;
        }
        this.selectionText();
        this.scrollBy();
    }

    prevResult() {
        this.indexResult--;
        if (this.indexResult < 0) {
            this.indexResult = this.result.length - 1;
        }
        this.selectionText();
        this.scrollBy();
    }

    scrollBy() {
        let messageList = document.querySelector(".message-list");
        let elem = this.result[this.indexResult];
        let topElem = elem.getBoundingClientRect().top;
        let top = topElem - MIN_TOP;
        messageList.scrollBy(0, top);
    }

    selectionText() {
        let selection = document.getSelection();
        let elem = this.result[this.indexResult].firstChild;
        let start = elem.textContent.search(this.oldValue);
        selection.setBaseAndExtent(elem, start, elem, start + this.oldValue.length);
    }

    searchText() {
        if (!this.value.trim()) {
            return false;
        }
        this.isSearch = true;
        let textElements = document.querySelectorAll('.message__text');
        this.result.length = 0;
        this.indexResult = 0;
        this.oldValue = this.value;
        textElements.forEach((text) => {
            let start = text.textContent.search(this.value);
            if (start !== -1) {
                this.result.push(text);
            }
        });
        if (this.result.length) {
            this.selectionText();
            this.scrollBy();
        }
    }

    getResultText() {
        if (this.result.length) {
            return `${this.indexResult + 1}/${this.result.length}`;
        }
    }
}

export default Search;