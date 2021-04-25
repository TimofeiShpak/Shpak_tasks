import { makeAutoObservable } from 'mobx';
import { MIN_TOP } from '../helpers/constants';
import { State } from '../helpers/interfaceList';

class Search {
  main: State;
  searchText = '';
  resultSearch: Array<HTMLElement> = [];
  index = 0;
  oldText = '';
  isSearch = false;

  constructor(main: State) {
    makeAutoObservable(this);
    this.main = main;
    this.changeSearchText = this.changeSearchText.bind(this);
    this.searchTodo = this.searchTodo.bind(this);
    this.resultText = this.resultText.bind(this);
    this.nextResult = this.nextResult.bind(this);
    this.prevResult = this.prevResult.bind(this);
  }

  nextResult() {
    this.index++;
    if (this.index === this.resultSearch.length) {
      this.index = 0;
    }
    this.selectionText();
    this.scrollBy();
  }
  
  prevResult() {
    this.index--;
    if (this.index < 0) {
      this.index = this.resultSearch.length - 1;
    }
    this.selectionText();
    this.scrollBy();
  }
  
  scrollBy() {
    let todoList = document.querySelector(".all-todos");
    let elem = this.resultSearch[this.index];
    let topElem =  elem.getBoundingClientRect().top;
    let top = topElem - MIN_TOP;
    todoList?.scrollBy(0, top);
  }

  selectionText() {
    let selection = document.getSelection();
    let elem = this.resultSearch[this.index];
    let textElem = elem.firstChild || elem;
    let start = textElem?.nodeValue?.search(this.oldText) || 0;
    selection?.setBaseAndExtent(textElem, start, textElem, start + this.oldText.length);
  }

  changeSearchText(event: React.ChangeEvent<HTMLInputElement>) {
    this.searchText = event.target.value;
    if (!this.searchText.trim()) {
      this.isSearch = false;
    }
  }

  findResult(text: HTMLElement) {
    let start = text.textContent?.search(this.searchText);
    if (start !== -1) {
        this.resultSearch.push(text);
    }
  }

  searchTodo() {
    if (!this.searchText.trim()) {
      return false;
    }
    let textElements: NodeListOf<HTMLElement> = document.querySelectorAll('.todo__text');
    this.resultSearch.length = 0;
    this.index = 0;
    this.oldText = this.searchText;
    this.isSearch = true;
    textElements.forEach((text) => this.findResult(text));
    if (this.resultSearch.length) {
      this.selectionText();
      this.scrollBy();
    }
  }

  resultText()  {
    return `${this.index + 1}/${this.resultSearch.length}`;
  }
}

export default Search;