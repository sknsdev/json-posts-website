const list = document.querySelector(".posts-list");
const btn_forward = document.querySelector(".forward-btn");
const btn_backward = document.querySelector(".backward-btn");
const btn_search = document.querySelector(".search-btn");
const posts_list = document.querySelector(".posts-list");
const search_input = document.getElementById("search-input-id");

let postsArray; //Хранилище всех полученных записей
let showedArray; //Массив с записями, которые сейчас выводятся
let filtredArray = []; //Массив с отфильтрованными записями
let postAmountMin = 0;
let postAmountMax = 10;
let search_text;

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

async function getPosts() {
  try {
    const response = await fetch(apiUrl);
    postsArray = await response.json();

    showedArray = postsArray.splice(postAmountMin, postAmountMax);
    displayPosts(showedArray);
  } catch (error) {
    console.error(error);
  }
}

function displayPosts(outputArray) {
  outputArray.forEach((element) => {
    const single_post = document.createElement("li");
    setAttributes(single_post, {
      class: "single-post-container flex",
    });

    const left_cont = document.createElement("div");
    setAttributes(left_cont, {
      class: "post-container_left",
    });

    const right_cont = document.createElement("div");
    setAttributes(right_cont, {
      class: "post-container_right",
    });

    const uid = document.createElement("span");
    uid.textContent = element.userId;
    setAttributes(uid, {
      class: "left-userid",
    });

    const post_title = document.createElement("h3");
    post_title.textContent = element.title;
    setAttributes(post_title, {
      class: "right-title",
    });

    const post_body = document.createElement("p");
    post_body.textContent = element.body;
    setAttributes(post_body, {
      class: "right-body",
    });

    list.appendChild(single_post);
    // single_post.appendChild(post);
    single_post.appendChild(left_cont);
    single_post.appendChild(right_cont);
    left_cont.appendChild(uid);
    right_cont.appendChild(post_title);
    right_cont.appendChild(post_body);
  });
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
/* Функция для фильтрации массива всей информации по слову */
function getFiltredArray(filterExample) {
  console.log(`В фильтре: ${postsArray[1]}`);
  let temparr = postsArray.filter(
    (item) =>
      item.body.includes(filterExample) == filterExample ||
      item.title.includes(filterExample) == filterExample
  );
  console.log(temparr);
  return temparr;
}

/*Page button's logic*/
function setButtonForward() {
  if (postAmountMax < postsArray.length) {
    postAmountMin += 10;
    postAmountMax += 10;
    posts_list.innerHTML = "";
    getPosts();
  } else {
    return;
  }
}

function setButtonBackward() {
  if (postAmountMin > 0) {
    postAmountMin -= 10;
    postAmountMax -= 10;
    posts_list.innerHTML = "";
    getPosts();
    console.log(postsArray);
  } else {
    return;
  }
}
/*Button's logic - end*/

/*Search button logic */
function startSearch() {
  search_text = document.getElementById("search-input-id").value;

  if (search_text != null && search_text != "") {
    posts_list.innerHTML = "";
    filtredArray = getFiltredArray(search_text);
    displayPosts(filtredArray);
  } else {
    displayPosts(showedArray);
  }
}

/*Search button end */
btn_search.onclick = startSearch;
btn_backward.onclick = setButtonBackward;
btn_forward.onclick = setButtonForward;

getPosts();
