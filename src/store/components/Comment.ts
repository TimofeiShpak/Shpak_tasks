import { State, CommentData } from '../helpers/interfaceList'
import { getId } from '../helpers/helpers'
import { makeAutoObservable } from 'mobx';
import api from '../../api/api';

class Comment {
  main: State;
  comment: string = '';
  comments: Array<CommentData> = [];
  idEditComment: string = '';
  isShowComments: boolean = false;

  constructor(main: State) {
    this.main = main;
    makeAutoObservable(this);
    this.closeEditComment = this.closeEditComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.createComment = this.createComment.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.setEditComment = this.setEditComment.bind(this);
  }

  createComment() {
    let { userName, userSrc } = this.main.user.userData;
    let idEdit = this.main.todo.idEdit;
    let todoList = this.main.todoList.todoList;
    let todoIndex = todoList.findIndex((todo) => todo.id === idEdit);
    let taskName = todoList[todoIndex].text;
    let comment = {
      userName: userName,
      userSrc: userSrc,
      id: getId(),
      time: `${new Date()}`,
      text: this.comment,
      taskName: taskName,
    }
    let todo = todoList[todoIndex];
    this.main.todoList.todoList[todoIndex].comments.push(comment);
    this.main.action.addAction(comment, 'Comment task', 'comment');
    this.comment = '';
    api.todo.edit(todo);
  }

  deleteComment(id: String) {
    let todoList = this.main.todoList.todoList;
    let idEdit = this.main.todo.idEdit;
    let commentIndex = this.comments.findIndex((comment) => comment.id === id);
    let todoIndex = todoList.findIndex((todo) => todo.id === idEdit);
    let comment = this.comments[commentIndex];
    let todo = todoList[todoIndex];
    this.main.action.addAction(comment, 'Delete comment in task', 'deleteComment');
    this.main.todoList.todoList[todoIndex].comments.splice(commentIndex, 1);
    api.todo.edit(todo);
    this.resetComment();
  }

  resetComment() {
    this.idEditComment = '';
    this.comment = ''; 
  }

  editComment() {
    let todoList = this.main.todoList.todoList;
    let idEdit = this.main.todo.idEdit;
    let commentIndex = this.comments.findIndex((comment) => comment.id === this.idEditComment);
    let todoIndex = todoList.findIndex((todo) => todo.id === idEdit);
    let comment = this.comments[commentIndex];
    let todo = todoList[todoIndex];
    comment.text = this.comment;
    console.log(todoIndex, this.idEditComment)
    this.main.todoList.todoList[todoIndex].comments[commentIndex] = comment;
    this.main.action.addAction(comment, 'Edit comment in task', 'comment');
    api.todo.edit(todo);
    this.resetComment();
  }

  saveComment(event: any) {
    event.preventDefault();
    if (this.idEditComment) {
      this.editComment()
    } else {
      this.createComment();
    }
  }

  openCommentList(id: string, comments: Array<CommentData>) {
    this.main.todo.idEdit = id;
    this.comments = comments;
    this.changeVisibilityComments();
  }

  changeVisibilityComments() {
    this.isShowComments = !this.isShowComments;
  }

  updateComment(event: any) {
    this.comment = event.target.value;
  }

  setEditComment(id: string, comment: string) {
    this.idEditComment = id;
    this.comment = comment;
  }

  closeEditComment() {
    this.resetComment();
    this.changeVisibilityComments();
  }
}

export default Comment;