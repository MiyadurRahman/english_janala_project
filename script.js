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
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট
words.forEach(word => {
    const card=document.createElement("div")
    card.className = "w-full max-w-sm"
    card.innerHTML=`<div class="bg-white rounded-xl shadow-sm text-center py-10 px-10 space-y-4">
            <h2 class="font-bold text-4xl">${word.word}</h2>
            <p class="font-semibold text-2xl">Meaning/Pronunciation</p>
            <div class="text-2xl font-semibold">${word.meaning ? word.word : "No meaning found"} / ${word.pronunciation}</div>
             <div class="flex justify-between">
            <button class="text-4xl "><i class="fa-solid fa-circle-info"></i></button>
            <button class="text-4xl"><i class="fa-solid fa-volume"></i></button>
        </div>
        </div>   `;
        wordcontainer.appendChild(card);
    });

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