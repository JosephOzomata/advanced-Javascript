// function fetchData(){
//     return new Promise((resolve, reject) => {
//         console.log("fetching data...");
//         setTimeout(() => {
//             const data = {id: 1, name: "sample data"};
//             if(data){
//                 resolve(data);//resolving the promise
//             }else{
//                 reject("no data found");
//             }
//         }, 3000)
//     })
// }

// //promise handling
// fetchData().then(data => {
//     console.log("Data recieved :", data);
// }).catch(error => {
//     console.error("Error Occured :", error);
// })


//promise chain hell
function doTask1(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            console.log("Task 1 completed");
            resolve()
        }, 4000)
    })
}

function doTask2(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            console.log("Task 2 completed");
            resolve()
        }, 1000)
    })
}

function doTask3(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            console.log("Task 3 completed");
            resolve()
        }, 1000)
    })
}
//handle the promise

doTask1()
.then(()=>doTask2())
.then(()=>doTask3())
.then(()=>{
    console.log("All tasks done");
})