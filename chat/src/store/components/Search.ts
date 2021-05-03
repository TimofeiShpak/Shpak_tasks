import { Module } from "vuex";
import { State } from "../store";
import { MIN_TOP } from '../helpers/constants'

export interface SearchStore {
  value: string,
  oldValue: string,
  result: Array<HTMLElement>,
  index: number,
  isSearch: boolean
}

function scrollBy(state: SearchStore) {
  let messageList = document.querySelector(".message-list");
  let elem = state.result[state.index];
  let topElem = elem.getBoundingClientRect().top;
  let top = topElem - MIN_TOP;
  messageList?.scrollBy(0, top);
}

function selectionText(state: SearchStore) {
  let selection = document.getSelection();
  let elem = state.result[state.index];
  let textElem = elem?.firstChild || elem;
  let start = textElem.textContent?.search(state.oldValue) || 0;
  selection?.setBaseAndExtent(textElem, start, textElem, start + state.oldValue.length);
}

function findResult(text: HTMLElement, state: SearchStore) {
  let start = text.textContent?.search(state.value);
  if (start !== -1) {
      state.result.push(text);
  }
}

function searchText(state: SearchStore) {
  if (!state.value.trim()) {
      return false;
  }
  state.isSearch = true;
  let textElements: NodeListOf<HTMLElement> = document.querySelectorAll('.message__text');
  state.result.length = 0;
  state.index = 0;
  state.oldValue = state.value;
  textElements.forEach((text) => findResult(text, state));
  if (state.result.length) {
      selectionText(state);
      scrollBy(state);
  }
}

function nextResult(state: SearchStore) {
  state.index++;
  if (state.index === state.result.length) {
      state.index = 0;
  }
  selectionText(state);
  scrollBy(state);
}

function prevResult(state: SearchStore) {
  state.index--;
  if (state.index < 0) {
      state.index = state.result.length - 1;
  }
  selectionText(state);
  scrollBy(state);
}

export const search: Module<SearchStore, State> = {
  namespaced: true,

  state: {
    value: '',
    oldValue: '',
    result: [],
    index: 0,
    isSearch: false
  },

  actions: {
    searchText({ state }) {
      searchText(state);
    },
    nextResult({ state }) {
      nextResult(state);
    },
    prevResult({ state }) {
      prevResult(state);
    },
    updateSearch({ state }, event) {
      state.value = event.target.value;
      if (!state.value.trim()) {
        state.isSearch = false;
      }
    }
  },

  getters: {
    resultText(state: SearchStore) {
      if (state.result.length) {
        return `${state.index + 1}/${state.result.length}`;
      }
    }
  }
} 