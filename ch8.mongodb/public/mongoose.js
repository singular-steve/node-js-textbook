[].forEach.call(document.querySelectorAll('#user-list tr'), el => {
  el.addEventListener('click', () => {
    const id = el.querySelector('td').textContent;
    getComment(id);
  })
});

function getUser() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      const users = JSON.parse(xhr.responseText);
      console.log(users);
      const tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(user => {
        const row = document.createElement('tr');
        row.addEventListener('click', () => {
          getComment(user._id);
        });
      
        let td = document.createElement('td');
        td.textContent = user._id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.age;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.married ? 'Married' : 'Single';
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  
  xhr.open('GET', '/users');
  xhr.send();
}

function getComment(id) {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      const comments = JSON.parse(xhr.responseText);
      const tbody = document.querySelector('#comment-lst tbody');
      tbody.innerHTML = '';
      comments.map(comment => {
        let row = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = comment._id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.commenter.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.comment;
        row.appendChild(td);
        td = document.createElement('td');
        
        const edit = document.createElement('button');
        edit.textContent = 'EDIT';
        edit.addEventListener('click', () => {
          const newComment = prompt('Input your comment!');
          if (!newComment) {
            return alert('Input your comment here!!!');
          }
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open('PATCH', '/comments/' + comment._id);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({ comment: newComment }));
        });
  
        const remove = document.createElement('button');
        remove.textContent = 'REMOVE';
        remove.addEventListener('click', () => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open('DELETE', '/comments/' + comment._id);
          xhr.send(JSON.stringify({ comment: newComment }));
        });
        
        td = document.createElement('td');
        td.appendChild(edit);
        row.appendChild(td);
        td = document.createElement('td');
        td.appendChild(remove);
        row.appendChild(td);
        
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', '/comments/' + id);
  xhr.send();
}

document.getElementById('user-form').addEventListener('submit', ev => {
  ev.preventDefault();
  const name = ev.target.username.value;
  const age = ev.target.age.value;
  const married = ev.target.married.checked;
  if (!name) {
    return alert('Input your name!');
  }
  if (!age) {
    return alert('Input your age!');
  }
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getUser();
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('POST', '/users');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ name, age, married }));
  ev.target.username.value = '';
  ev.target.age.value = '';
  ev.target.married.checked = false;
});

document.getElementById('comment-form').addEventListener('submit', ev => {
  ev.preventDefault();
  const id = ev.target.userId.value;
  const comment = ev.target.comment.value;
  if (!id) {
    return alert('Input your Id!');
  }
  if (!comment) {
    return alert('Input your comment!');
  }
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getComment(id);
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('POST', '/comments');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ id, comment }));
  ev.target.id.value = '';
  ev.target.comment.value = '';
});