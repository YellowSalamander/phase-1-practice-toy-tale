// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// const toyForm = document.querySelector(".add-toy-form");
// toyForm.addEventListener("submit", handleForm)

// });

// function renderOneToy(toy) {
//   let card = document.createElement('li')
//   card.className = 'card'
//   card.innerHTML = `
//   <img src= "${toy.image}>
//   <div class = "content">
//     <h2> ${toy.name}
//     <p>
//     $<span class ="likes"> ${toy.likes} </span> Likes
//     <p>
//     </div>
//   `
//   let toyCollection = document.getElementById("toy-collection")
//   toyCollection.appendChild(card)
// }


// function retrieveData () {
//   fetch('http://localhost:3000/toys')
//   .then(res => res.json())
//   .then (toyData => {toyData.forEach(toy => {renderOneToy(toy) 
//   });
//   })
//   .catch(error => {
//     console.error('ErrorL', error)
//   })
// }

// function renderToyData() {
// retrieveData()

// }
// document.addEventListener('DOMContentLoaded', function() {
//   renderToyData()
// });

// function handleForm(event){
//   event.preventDefault()
//   const toyNameInput = document.querySelector('input[name = "name"]')
//   const toyImageInput = document.querySelector('input[name = "image"]')
  
//   const toy = {
//     name: toyNameInput.value,
//     image: toyImageInput.value,
//     likes: 0 
//   }
// renderOneToy(toy)

// toyNameInput.value= ''
// toyImageInput.value = ''
// }

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  const toyCollection = document.getElementById("toy-collection");

  let addToy = false;

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function renderOneToy(toy) {
    let card = document.createElement('li');
    card.className = 'card';
    card.classList.add('card')
    card.innerHTML = `
      <img src="${toy.image}">
      <div class="content">
        <h2>${toy.name}</h2>
        <p>$<span class="likes">${toy.likes}</span> Likes</p>
        <button class = "like-btn">like</button>
      </div>
    `;
    toyCollection.appendChild(card);

    const likeBtn = card.querySelector('.like-btn')
    const likesCount = card.querySelector('.likes')
    likeBtn.addEventListener('click', () => {
      toy.likes += 1
      likesCount.textContent = toy.likes
      updateToy(toy)
    })
  }

  function retrieveData() {
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toyData => {
        toyData.forEach(toy => {
          renderOneToy(toy);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function renderToyData() {
    retrieveData();
  }

  function handleForm(event) {
    event.preventDefault();

    const toyNameInput = document.querySelector('input[name="name"]');
    const toyImageInput = document.querySelector('input[name="image"]');

    const toy = {
      name: toyNameInput.value,
      image: toyImageInput.value,
      likes: 0
    };

    renderOneToy(toy);

    createToy(toy)

    toyNameInput.value = "";
    toyImageInput.value = "";

    toyFormContainer.style.display = "none";
  }

  toyForm.addEventListener("submit", handleForm);

function updateToy(toy){
  fetch(`http://localhost:3000/toys/${toy.id}` , {
    method: 'PATCH',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(updatedToy => {
    console.log('Toy updated:', updatedToy);
  })
    .catch(error => [
      console.error('Error:', error)
    ])
 
}

function createToy(toy){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then (res=> res.json())
  .then(createdToy => {
    console.log('New toy created', createdToy);
  })
.catch(error => {
  console.error('Error:', error)
})

}


  renderToyData();
});