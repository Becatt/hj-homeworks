'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments').appendChild(
    list.reduce((f, item) => {
      f.appendChild(createComment(item));
      return f;
    }, document.createDocumentFragment())
  );
  // const comments = list.map(createComment).join('');
  // commentsContainer.innerHTML += comments;
}

function createComment(comment) {
  // return `<div class="comment-wrap">
  //   <div class="photo" title="${comment.author.name}">
  //     <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
  //   </div>
  //   <div class="comment-block">
  //     <p class="comment-text">
  //       ${comment.text.split('\n').join('<br>')}
  //     </p>
  //     <div class="bottom-comment">
  //       <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
  //       <ul class="comment-actions">
  //         <li class="complain">Пожаловаться</li>
  //         <li class="reply">Ответить</li>
  //       </ul>
  //     </div>
  //   </div>
  // </div>`

  const commentWrap = document.createElement('div');
  const photo = document.createElement('div');
  const avatar = document.createElement('div');
  const commentBlock = document.createElement('div');
  const commentText = document.createElement('p');
  const bottomComment = document.createElement('div');
  const commentDate = document.createElement('div');
  const commentActions = document.createElement('ul');
  const complain = document.createElement('li');
  const reply = document.createElement('li');

  commentWrap.className = 'comment-wrap';
  photo.className = 'photo';
  photo.title = comment.author.name;

  avatar.className = 'avatar';
  avatar.style.backgroundImage = `url(${comment.author.pic})`

  commentBlock.className = 'comment-block';

  commentText.className = 'comment-text';
  // commentText.textContent = comment.text.split('\n').join('<br>');

  bottomComment.className = 'bottom-comment';

  commentDate.className = 'comment-date';
  commentDate.textContent = new Date(comment.date).toLocaleString('ru-Ru');

  commentActions.className = 'comment-actions';

  complain.className = 'complain';
  complain.textContent = 'Пожаловаться';

  reply.className = 'reply';
  reply.textContent = 'Ответить'

  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);
  photo.appendChild(avatar);
  commentBlock.appendChild(commentText);
  commentBlock.appendChild(bottomComment);
  bottomComment.appendChild(commentDate);
  bottomComment.appendChild(commentActions);
  commentActions.appendChild(complain);
  commentActions.appendChild(reply);

  commentText.appendChild(
    comment.text.split('\n').reduce((f, item) => {
      f.appendChild(document.createTextNode(item));
      f.appendChild(document.createElement('br'));
      return f;
    }, document.createDocumentFragment())
  );

  return commentWrap;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
