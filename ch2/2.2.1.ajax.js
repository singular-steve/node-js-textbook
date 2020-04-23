let xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 200 || xhr.status === 201) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.responseText);
    }
  }
};

xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      console.log(xhr.responseText);
    }
};

xhr.onerror = () => {
  console.log(xhr.responseText)
};

xhr.open('GET', 'https://abc.com/api/get');
xhr.send();

const data = {
  name: 'hello',
  age: 100,
};

xhr.open('POST', 'https://abc.com/api/post');
xhr.send(JSON.stringify(data));