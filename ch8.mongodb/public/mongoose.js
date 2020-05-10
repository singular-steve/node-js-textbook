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