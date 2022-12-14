// JSON Data Deep Dive
// Typically, data is transferred as "JSON" data between your client-side code and your backend ("the server").
// JSON stands for JavaScript Object Notation and it looks like this:
// {
//     "name": "Max",
//     "age": 30,
//     "hobbies": [
//         { "id": "h1", "title": "Sports" },
//         { "id": "h2", "title": "Cooking" }
//     ],
//     "isInstructor": true
// }
// JSON data supports objects ({}), arrays ([]), strings (MUST use double-quotes!), numbers (NO quotes) and booleans (also NO quotes).
// All object keys (e.g. "name") HAVE to be wrapped by double quotes. No quotes or single quotes are NOT ALLOWED!
// Actually, the whole JSON "object" is wrapped in quotes itself because JSON data in the end is just a string that contains data in the format shown above.
// You can test it yourself - take the following non-JSON JavaScript object and apply JSON.stringify() on it. This will convert it to JSON data. If you do that in the dev tools console, you'll see that you in the end get a string which contains data formatted as shown above.
// const person = { // this is NOT JSON - it's a normal ("raw") JavaScript object!
//     name: 'Max',
//     age: 30,
//     hobbies: [
//         { id: 'h1', title: 'Sports' },
//         { id: 'h2', title: 'Cooking' }
//     ],
//     isInstructor: true
// };
// const jsonData = JSON.stringify(person); // convert raw JS data to JSON data string
// console.log(jsonData); // a string with machine-readable JSON data in it
// console.log(typeof jsonData); // string
// We use JSON data because it's easy to parse for machines - and as an extra benefit it's also quite readable to us humans.
// If you receive some JSON data and you want to convert it back into normal JS data, you can use JSON.parse():
// const parsedData = JSON.parse(jsonData); // yields a "raw" JS object/ array etc.
// Also nice to know: You're NOT LIMITED to objects when converting data to JSON. You can also convert numbers, arrays, booleans or just strings - all data types JSON supports:
// const jsonNumber = JSON.stringify(2); // "2"
// const jsonText = JSON.stringify('Hi there! I use single quotes in raw JS'); // ""Hi there! ...""
// const jsonArray = JSON.stringify([1, 2, 3]); // "[1,2,3]"
// const jsonBoolean = JSON.stringify(true); // "true"

const singlePost = document.getElementById('single-post');
const postsDisp = document.querySelector('.posts');
const newPost = document.getElementById('new-post');
const inputTitle = newPost.querySelector('#title');
const inputContent = newPost.querySelector('#content');
const addBtn = newPost.querySelector('button');
const fetchBtn = document.getElementById('fetch');
const form = document.querySelector('form');
const ulItem = document.querySelector('ul');

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
}

async function fetchPosts() {
  const responseData = await sendHttpRequest(
    'GET',
    'https://jsonplaceholder.typicode.com/posts'
  );
  for (const post of responseData) {
    const postElement = document.importNode(singlePost.content, true);
    postElement.querySelector('h2').textContent = post.title.toUpperCase();
    postElement.querySelector('p').textContent = post.body;
    postElement.querySelector('li').id = post.id;
    postsDisp.append(postElement);
  }
}

fetchBtn.addEventListener('click', fetchPosts);

async function createPost() {
  let userID = Math.random();
  const postData = {
    title: inputTitle.value,
    body: inputContent.value,
    userId: userID,
  };

  sendHttpRequest(
    'POST',
    'https://jsonplaceholder.typicode.com/posts',
    postData
  );
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createPost();
});

async function deletePost(id) {
  sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${id}`);
}

ulItem.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    deletePost(event.target.closest('li').id);
  }
});

// PROMISIFYING

// fetchBtn.addEventListener('click', () => {
//   sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
//     .then((responseData) => {
//       for (const post of responseData) {
//         const postElement = document.importNode(singlePost.content, true);
//         postElement.querySelector('h2').textContent = post.title.toUpperCase();
//         postElement.querySelector('p').textContent = post.body;
//         postsDisp.append(postElement);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
