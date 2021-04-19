import { State } from "../helpers/interfaceList";
import { MIN_TOP } from '../helpers/constants';

function nextResult(state: State) {
  state.search.index++;
  if (state.search.index === state.search.resultSearch.length) {
    state.search.index = 0;
  }
  selectionText(state);
  scrollBy(state);
}

function prevResult(state: State) {
  state.search.index--;
  if (state.search.index < 0) {
    state.search.index = state.search.resultSearch.length - 1;
  }
  selectionText(state);
  scrollBy(state);
}

function scrollBy(state: State) {
  let todoList = document.querySelector(".all-todos");
  let elem = state.search.resultSearch[state.search.index];
  let topElem = elem.getBoundingClientRect().top;
  let top = topElem - MIN_TOP;
  todoList?.scrollBy(0, top);
}

function  selectionText(state: State) {
  let selection = document.getSelection();
  let elem = state.search.resultSearch[state.search.index];
  let textElem = elem.firstChild || elem;
  let start = textElem?.nodeValue?.search(state.search.oldText) || 0;
  selection?.setBaseAndExtent(textElem, start, textElem, start + state.search.oldText.length);
}

function findResult(text: HTMLElement, state: State) {
  let start = text.textContent?.search(state.search.searchText);
  if (start !== -1) {
      state.search.resultSearch.push(text);
  }
}

function searchTodo(state: State) {
  if (!state.search.searchText.trim()) {
      return false;
  }
  let textElements: NodeListOf<HTMLElement> = document.querySelectorAll('.todo__text');
  state.search.resultSearch.length = 0;
  state.search.index = 0;
  state.search.oldText = state.search.searchText;
  state.search.isSearch = true;
  textElements.forEach((text) => findResult(text, state));
  if (state.search.resultSearch.length) {
      selectionText(state);
      scrollBy(state);
  }
}

function updateSearchText(state: State, event: Event) {
  state.search.searchText = (<HTMLInputElement>event.target).value;
  if (!state.search.searchText.trim()) {
    state.search.isSearch = false;
  }
}

export { searchTodo, nextResult, prevResult, updateSearchText }