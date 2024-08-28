// var name ="John";
// var age =30;
// var offline = false;

// var a = 10;
// var b =20;
// let d = 4
// var c = d*(a + b);
// console.log(c);

// const person ={
//     firstName: "John",
//     LastName: "Doe",
//     age: 30,
//     occupation: "Software Engineer",
//     fullName:function(){
//         return this.firstName + "" + this.LastName
//     },
//     address:{
//         street: "123 Main St",
//         city: "Anytown",
//         state: "CA",
//         zip: "12345"
//     }
// }
// console.log(`my name is ${person.LastName}`);
// // console.log(person.fullName());

// // Array Method
// const color = ["red","blue", "green"]
// console.log(color);

// const numbers = [1,2,3,4,5]
// const double = numbers.map(function (num) {
//     return num*2
// })

// console.log(double);

// //String methods
// const text = "ayo dele"
// const trans = text.toUpperCase()
// console.log(trans);

// const today = new Date()
// const year = today.getFullYear()
// console.log(year);



// const age = 18;
// if (age >= 18) {
//     console.log(`you are an adult`);
// }else{
//     console.log(`you are a minor`);
// }

// let day = 3
// let title;
// switch (day) {
//     case 1:
//         title ="Monday"
//         break;
//     case 2:
//         title ="Tueday"
//         break;
//     case 3:
//         title ="Wednesday"
//         break;
//     case 4:
//         title ="Thurday"
//         break;
//     case 5:
//         title = "Friday"
//         break
//     default:
//         title = "Weekend"
//         break;
// }
// console.log(title);


// switch (age) {
//     case 28:
//         console.log(`old man`);
//         break;

//     default:
//         console.log(`young man`);
//         break;
// }

// for (let i = 0; i < 5; i++) {
//     console.log(i);
    
// }

// const data = ["ayo", "Jackson", "Ann"]
// for (let i = 0; i < data.length; i++) {
//     console.log(data[i]);
// }

// const numbers =[1,2,3]
// const numbers2 = [...numbers,4,5,6]//spread operator
// console.log(typeof(numbers[2]));
// console.log(numbers2);

// const person = {
//     name : 'John',
//     age : '15',
//     address : "house 5 block C"
// }

// const updatep = {
//     ...person,
//     job: 'web dev'
// }
// console.log(updatep);
// console.log(updatep.name);
// console.log(updatep.job);


// function add(x,y,z,a){
//     return x + y + z + a
// }
// const numb = [1,2,3]
// const result = add(...numb,2)
// console.log(result);


// const fruit = ["apple","mangos", "banana" ,"orange"]
// const [a,m,b,o] = fruit
// console.log(a);


// const person = {
//     name: "john",
//     age: 23
// }
// const {age, name} = person;
// console.log(name);





// const ProductPage = ()=>{
//     const person = {
//     name: "john",
//     age: 23
//     }
//     const {age, name} = person;
//     console.log(name);  

//     return(
//         <div>
//             <DetailPage getage = {age}/>
//         </div>
//     )
// }

// const DetailPage = ()=>{
//     const person = {
//     name: "john",
//     age: 23
//     }
//     const {age, name} = person;
//     console.log(name);  

//     return(
//         <div>
//             <h1>{age}</h1>
//         </div>
//     )
// }

//OBJECT DESTRUCTURING



//recursion

function fact(n){
    if (n === 0 || n === 1) {
        return 1
    }
    return n* fact(n-1)
}
console.log(fact(5));


let comments = [
    {
        id: 1,
        text: "This government sucks",
        replies: [
            {
                id: 2,
                text: "I agree",
                replies: [
                    {
                        id: 3,
                        text: "I disagree",
                        replies: []
                    }
                ]
            }
            
        ]
    },
    {
        id: 4,
        text: "Why is South Africa trending",
        replies: []
    }
]

console.log(comments);


function renderComments(comments){
    if(!comments || !comments.length === 0){
        return `<p>No comments yet</p>`
    }
    let html = '<ul>'
    comments.forEach(comment => {
        html += `
        <li>
            <p>${comment.text}</p>
            ${renderComments(comment.replies)}
        </li>
        `
    })
    html += '</ul>';
    return html
}

const commentsection = document.getElementById('nexted-comment')
commentsection.innerHTML = renderComments(comments);



    document.addEventListener("DOMContentLoaded", async () => {
        const productCategories = document.getElementById("product-categories");
        const loadingSpinner = document.getElementById("loading-spinner");
        const errorMessage = document.getElementById("error-message");

        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) throw new Error("Failed to fetch data from the API.");

            const data = await response.json();
            loadingSpinner.style.display = 'none'; // Hide the loading spinner

            const productsByCategory = groupByCategory(data);
            for (const [category, products] of Object.entries(productsByCategory)) {
                const categorySection = createCategorySection(category, products);
                productCategories.appendChild(categorySection);
            }
        } catch (error) {
            loadingSpinner.style.display = 'none'; // Hide the loading spinner
            errorMessage.textContent = `An error occurred: ${error.message}`;
            errorMessage.classList.remove("hidden");
        }
    });

    function groupByCategory(products) {
        return products.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});
    }

    function createCategorySection(category, products) {
        const section = document.createElement('div');
        section.className = 'mb-12';

        const heading = document.createElement('h2');
        heading.className = 'text-3xl font-bold mb-6';
        heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8';

        products.forEach(product => {
            const productCard = createProductCard(product);
            grid.appendChild(productCard);
            observeVisibility(productCard); // Observe each product card for visibility
        });

        section.appendChild(heading);
        section.appendChild(grid);

        return section;
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card bg-white p-6 rounded-lg shadow-lg fade-in';

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover rounded-lg mb-4">
            <h2 class="text-xl font-bold mb-2">${product.title}</h2>
            <p class="text-lg font-semibold text-green-400 mb-2">$${product.price.toFixed(2)}</p>
            <p class="text-gray-300 mb-4">${truncateText(product.description, 100)}</p>
            <span class="inline-block bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">${product.category}</span>
            <button class="bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300">Add to Cart</button>
        `;
        return card;
    }

    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    // Function to observe when a product card enters the viewport
    function observeVisibility(element) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Add the 'visible' class when in view
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            });
        });

        observer.observe(element);
    }
