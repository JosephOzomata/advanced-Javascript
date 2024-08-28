    // function fetchData(callback){
    //     console.log(`fetching data...`);
    //     setTimeout(() => {
    //         const data = {id: 1, name: "Sample data"};
    //         callback(null, data);//invoking the call back function
    //     }, 3000)
    // }

    // function processData(reject, resolve){
    //     if(reject){
    //         console.log(`An error occured`, reject);
    //     }else{
    //         console.log(`Data recieved`, resolve);
    //     }
    // }

    // fetchData(processData)



//CALLBACK HELL (NESTED CALLBACK)
 function doTask1(callback){
    setTimeout(() => {
        console.log("Task 1 completed");
        callback()
    }, 4000)
 }
 function doTask2(callback){
    setTimeout(() => {
        console.log("Task 2 completed");
        callback()
    },1000)
 }
 function doTask3(callback){
    setTimeout(() => {
        console.log("Task 3 completed");
        callback()
    }, 1000)
 }


//nested callback

doTask1(() => {
    doTask2(() => {
        doTask3(() => {
            console.log("All tasks completed");
        })
    })
})