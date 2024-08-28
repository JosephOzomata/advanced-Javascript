// document.addEventListener("DOMContentLoaded", function () {
//     const productGrid = document.getElementById("product-grid");
//     const errorMessage = document.getElementById("error-message");

//     fetch("https://fakestoreapi.com/products")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             displayProducts(data);
//         })
//         .catch(error => {
//             displayError(error.message);
//         });

//     function displayProducts(products) {
//         products.forEach(product => {
//             const productCard = document.createElement("div");
//             productCard.className = "bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300";

//             const productImage = document.createElement("img");
//             productImage.src = product.image;
//             productImage.alt = product.title;
//             productImage.className = "w-full h-64 object-cover rounded-lg mb-4";

//             const productTitle = document.createElement("h2");
//             productTitle.className = "text-xl font-bold mb-2";
//             productTitle.textContent = product.title;

//             const productPrice = document.createElement("p");
//             productPrice.className = "text-lg font-semibold text-green-400 mb-2";
//             productPrice.textContent = `$${product.price.toFixed(2)}`;

//             const productDescription = document.createElement("p");
//             productDescription.className = "text-gray-300 mb-4";
//             productDescription.textContent = product.description;

//             const productCategory = document.createElement("span");
//             productCategory.className = "inline-block bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-4";
//             productCategory.textContent = product.category;

//             const addToCartButton = document.createElement("button");
//             addToCartButton.className = "bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300";
//             addToCartButton.textContent = "Add to Cart";
//             addToCartButton.addEventListener("click", () => {
//                 alert(`Added ${product.title} to your cart!`);
//             });

//             productCard.appendChild(productImage);
//             productCard.appendChild(productTitle);
//             productCard.appendChild(productPrice);
//             productCard.appendChild(productDescription);
//             productCard.appendChild(productCategory);
//             productCard.appendChild(addToCartButton);

//             productGrid.appendChild(productCard);
//         });
//     }

//     function displayError(message) {
//         errorMessage.textContent = `Error: ${message}`;
//         errorMessage.classList.remove("hidden");
//     }
// });









document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.getElementById("product-grid");
    const errorMessage = document.getElementById("error-message");

    fetch("https://fakestoreapi.com/products")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            displayError(error.message);
        });

    function displayProducts(products) {
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "bg-grey-300 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between mb-6";

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.title;
            productImage.className = "w-full h-64 object-cover rounded-lg mb-4";

            const productTitle = document.createElement("h2");
            productTitle.className = "text-xl font-bold mb-2 text-gray-900";
            productTitle.textContent = product.title;

            const productPrice = document.createElement("p");
            productPrice.className = "text-lg font-semibold text-green-600 mb-2";
            productPrice.textContent = `$${product.price.toFixed(2)}`;

            const productDescription = document.createElement("p");
            productDescription.className = "text-gray-600 mb-4 line-clamp-3";
            productDescription.textContent = product.description;

            const productCategory = document.createElement("span");
            productCategory.className = "inline-block bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-4";
            productCategory.textContent = product.category;

            // const likeButton = document.createElement("input");
            // likeButton.type = "radio";
            // likeButton.className = "mr-2";
            // const likeLabel = document.createElement("label");
            // likeLabel.textContent = "Like";
            // const likeContainer = document.createElement("div");
            // likeContainer.className = "mb-4";
            // likeContainer.appendChild(likeButton);
            // likeContainer.appendChild(likeLabel);

            const addToCartButton = document.createElement("button");
            addToCartButton.className = "bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 w-full";
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.addEventListener("click", () => {
                alert(`Added ${product.title} to your cart!`);
            });

            const commentSection = document.createElement("div");
            commentSection.className = "mt-4";
            commentSection.innerHTML = `
                <h3 class="text-lg font-semibold mb-2">Comments</h3>
                <div class="mb-4">
                    <input type="text" placeholder="Add a comment..." class="p-2 border rounded-lg w-full mb-2">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
                </div>
                <div class="nested-comments"></div>
            `;

            productCard.appendChild(productImage);
            productCard.appendChild(productTitle);
            productCard.appendChild(productPrice);
            productCard.appendChild(productDescription);
            productCard.appendChild(productCategory);
            productCard.appendChild(likeContainer);
            productCard.appendChild(addToCartButton);
            productCard.appendChild(commentSection);

            productGrid.appendChild(productCard);

            handleComments(commentSection);
        });
    }

    function handleComments(commentSection) {
        const input = commentSection.querySelector("input[type='text']");
        const button = commentSection.querySelector("button");
        const nestedCommentsContainer = commentSection.querySelector(".nested-comments");

        button.addEventListener("click", () => {
            const commentText = input.value.trim();
            if (commentText !== "") {
                addComment(nestedCommentsContainer, commentText);
                input.value = "";
            }
        });
    }

    function addComment(container, text, level = 0) {
        const comment = document.createElement("div");
        comment.className = `ml-${level * 4} mb-4`;

        const commentText = document.createElement("p");
        commentText.textContent = text;
        commentText.className = "text-gray-800";

        const replyButton = document.createElement("button");
        replyButton.textContent = "Reply";
        replyButton.className = "text-blue-500 hover:underline ml-2";
        replyButton.addEventListener("click", () => {
            const replyInput = document.createElement("input");
            replyInput.type = "text";
            replyInput.placeholder = "Reply...";
            replyInput.className = "p-2 border rounded-lg w-full mb-2";

            const replySubmit = document.createElement("button");
            replySubmit.textContent = "Submit";
            replySubmit.className = "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600";

            const replyContainer = document.createElement("div");
            replyContainer.className = "mt-2";

            replySubmit.addEventListener("click", () => {
                const replyText = replyInput.value.trim();
                if (replyText !== "") {
                    addComment(container, replyText, level + 1);
                    replyContainer.remove();
                }
            });

            replyContainer.appendChild(replyInput);
            replyContainer.appendChild(replySubmit);
            comment.appendChild(replyContainer);
        });

        comment.appendChild(commentText);
        comment.appendChild(replyButton);
        container.appendChild(comment);
    }

    function displayError(message) {
        errorMessage.textContent = `Error: ${message}`;
        errorMessage.classList.remove("hidden");
    }
});
