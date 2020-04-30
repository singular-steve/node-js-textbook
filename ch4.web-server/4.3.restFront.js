function getUser() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      const users = JSON.parse(xhr.responseText);
      let list = document.getElementById('list');
      list.innerHTML = '';
      Object.keys(users).map((key) => {
        let userDiv = document.createElement('div');
        let span = document.createElement('span');
        span.textContent = users[key];
        let edit = document.createElement('button');
        edit.textContent = 'Edit';
        edit.addEventListener('click', () => {
          const name = prompt('Input your name.');
          if (!name) {
            return alert('Input your name!');
          }
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getUser();
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open('PUT', '/users/' + key);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({ name: name}));
        });
        let remove = document.createElement('button');
        remove.textContent = 'Remove';
        remove.addEventListener('click', () => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getUser();
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open('DELETE', '/users/' + key);
          xhr.send();
        });
        userDiv.appendChild(span);
        userDiv.appendChild(edit);
        userDiv.appendChild(remove);
        list.appendChild(userDiv);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', '/users');
  xhr.send();
}

window.onload = getUser;

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert('Input your name!');
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
  xhr.send(JSON.stringify({ name: name}));
  e.target.username.value = '';
});