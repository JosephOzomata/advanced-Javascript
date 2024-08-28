// function didvidNums(a,b){
//     try {
//         if (b === 0){
//             throw new Error('Cannot divide by zero')
//         }
//         const result = a/b;
//         console.log(`result: ${result}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`)
//     }
// }

// didvidNums(2,2)

//https://jsonplaceholder.typicode.com/post

async function fetchData(url){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`http error, ststus: ${response.status}`)
        }
        const data = await response.json()
        console.log(`Data fetched successfuly: `, data);
    } catch (error) {
        console.error(`Failed to fetch data`, error.message);
    }
} 
fetchData("https://jsonplaceholder.typicode.com/posts")



function a(){
    let count = 0
    return function (){
        count++
        console.log(`Current count: ${count}`);
    }
}