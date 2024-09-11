let totalPrice = 0; 
function handleFormSubmit(event) {
  event.preventDefault();
  
  const productDetails = {
    amount: parseFloat(event.target.amount.value), 
    product: event.target.product.value,
  };
  axios
    .post("https://crudcrud.com/api/01d2632898a548e3a8e7db994f5b46bf/application", productDetails)
    .then((response) => {
      const createdProduct = response.data;
      display(createdProduct); // Display new product in the list
      updateTotalPrice(); // Update total price after adding a product
    })
    .catch((error) => console.log(error));
  document.getElementById("amount").value = "";
  document.getElementById("product").value = "";
}
function display(productDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(document.createTextNode(`${productDetails.amount} - ${productDetails.product}`));
  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete Product"));
  userItem.appendChild(deleteBtn);

  const userList = document.getElementById("productList");
  userList.appendChild(userItem);

  // Add event listener to delete product
  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);

    // Delete the product from CrudCrud
    axios
      .delete(`https://crudcrud.com/api/01d2632898a548e3a8e7db994f5b46bf/application/${productDetails._id}`)
      .then(() => {
        updateTotalPrice(); // Update total price after removing a product
      })
      .catch((error) => console.log(error));
  });
}
function fetchAndDisplayProducts() {
  axios
    .get("https://crudcrud.com/api/01d2632898a548e3a8e7db994f5b46bf/application")
    .then((response) => {
      const products = response.data;
      products.forEach((product) => display(product));
      updateTotalPrice(); // Update total price after fetching all products
    })
    .catch((error) => console.log(error));
}

// Function to calculate and display the total price
function updateTotalPrice() {
  const productList = document.querySelectorAll("#productList li");
  totalPrice = 0; // Reset total price

  productList.forEach((item) => {
    const amountText = item.firstChild.textContent.split(" - ")[0]; // Get the amount text
    totalPrice += parseFloat(amountText); // Add to total price
  });

  document.getElementById("totalPrice").textContent = totalPrice.toFixed(2); // Update displayed total price
}

// Fetch all products when the page loads
window.onload = function () {
  fetchAndDisplayProducts();
};
