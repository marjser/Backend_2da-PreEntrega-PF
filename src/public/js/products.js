
let button 
const butAddCart = document.getElementById("addToCart");

let cartId

if (document.getElementById("createCart")) {
  button = document.getElementById("createCart")
}

if (document.getElementById("cartId")) {
  cartId = document.getElementById("cartId").textContent
}
//let prodId = document.getElementById("prodId").value

//console.log(cartId)


//let code

butAddCart.addEventListener("click", () => {
  let prodId = document.getElementById("prodId").value
  console.log(prodId)


fetch(`/carts/${cartId}/product/${prodId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    //body: JSON.stringify(patchData),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
})



button.addEventListener("click", () => {


    fetch('/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(patchData),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

      location.reload()


})


// button.addEventListener("click", async () => {

//     fetch('/carts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         //body: JSON.stringify(patchData),
//       })
//       .then(response => response.json())
//       .then(data => {
//                         console.log(data)
//                         code = data
//                         })
//       .catch(error => console.error(error));

//       //location.reload()


// })
