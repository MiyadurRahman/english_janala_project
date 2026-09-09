const loadlesson=()=>{

    fetch('https://openapi.programming-hero.com/api/levels/all')//return promise
    .then(response=> response.json())
    .then(json => displaylesson(json.data));
}
const loadlevelword = (lessonId) => {
    const url = `https://openapi.programming-hero.com/api/level/${lessonId}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => displaylevelword(data.data))
        .catch((error) => console.error("Failed to load lesson:", error));

}
const displaylevelword=(words)=>{
const wordcontainer= document.getElementById("word-container")
wordcontainer.innerHTML="";

words.forEach(word => {
    const card=document.createElement("div")
    card.innerHTML=`   `
});

wordcontainer.appendChild(card);

}
const displaylesson =(lessons)=>{
    // get the container & empty
    const levelcontainer=document.getElementById("level-container")
    levelcontainer.innerHTML="";


    // get intoo every lesson 
 for(let lesson of lessons){
    const btnDiv=document.createElement("div");
    btnDiv.innerHTML=`<button onclick="loadlevelword(${lesson.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open-reader"></i>
    Lesson-${lesson.level_no}</button>`

    levelcontainer.appendChild(btnDiv);
 }







}
 loadlesson();