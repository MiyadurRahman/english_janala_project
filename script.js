const loadlesson=()=>{

    fetch('https://openapi.programming-hero.com/api/levels/all')//return promise
    .then(response=> response.json())
    .then(json => displaylesson(json.data));
}
const displaylesson =(lessons)=>{
    // get the container & empty
    const levelcontainer=document.getElementById("level-container")
    levelcontainer.innerHTML="";


    // get intoo every lesson 
 for(let lesson of lessons){
    const btnDiv=document.createElement("div");
    btnDiv.innerHTML=`<button class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open-reader"></i>
    Learn</button>`

    levelcontainer.appendChild(btnDiv);
 }







}
 loadlesson();