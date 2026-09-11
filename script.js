const loadlesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())
        .then(json => displaylesson(json.data));
}

const loadlevelword = (lessonId) => {
    const url = `https://openapi.programming-hero.com/api/level/${lessonId}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // Reset all buttons to outline
            const allButtons = document.querySelectorAll('.btn-primary');
            allButtons.forEach(btn => {
                btn.classList.add("btn-outline");
            });

            // Make clicked button solid blue
            const clickbtn = document.getElementById(`lesson-btn-${lessonId}`);
            if (clickbtn) {
                clickbtn.classList.remove("btn-outline");
            }

            displaylevelword(data.data);
        })
        .catch((error) => console.error("Failed to load lesson:", error));
}

const loadwordinfo = async (id) => {
    // Add try/catch to async/await to prevent crashes if the API fails
    try {
        const url = `https://openapi.programming-hero.com/api/word/${id}`;
        const res = await fetch(url);
        const details = await res.json();
        
        displaywordinfo(details.data);
    } catch (error) {
        console.error("Failed to load word details:", error);
    }
}

const displaywordinfo = (word) => {
    const infobox = document.getElementById("info-container");
    
    // Inject actual word data instead of "hi"
    infobox.innerHTML = `
        <h3 class="text-3xl font-bold mb-2">${word.word}</h3>
        <p class="text-lg"><strong>Meaning:</strong> ${word.meaning}</p>
        <p class="text-lg"><strong>Pronunciation:</strong> ${word.pronunciation}</p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>
    `;
    
    document.getElementById("info_modal").showModal();
}

const displaylevelword = (words) => {
    const wordcontainer = document.getElementById("word-container");
    wordcontainer.innerHTML = "";

    if (words.length == 0) {
        // FIXED: The closing div tag is now correctly </div> instead of <\div>
        wordcontainer.innerHTML = `<div class="bg-white grid justify-center col-span-full rounded-xl shadow-sm text-center py-10 px-10 space-y-4">
            <h1 class="text-2xl flex justify-center font-bold-700">No vocabulary added here.</h1>
        </div>`;
        return; // Stops the function here if there are no words
    }

    words.forEach(word => {
        const card = document.createElement("div");
        card.className = "w-full max-w-sm";
        // FIXED: Using word.meaning instead of word.word in the ternary operator
        card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center py-10 px-10 space-y-4">
            <h2 class="font-bold text-4xl">${word.word}</h2>
            <p class="font-semibold text-2xl">Meaning/Pronunciation</p>
            <div class="text-2xl font-semibold">${word.meaning ? word.meaning : "No meaning found"} / ${word.pronunciation}</div>
            <div class="flex justify-between">
                <button onclick="loadwordinfo(${word.id})" class="text-4xl hover:text-blue-500 transition-colors"><i class="fa-solid fa-circle-info"></i></button>
                <button class="text-4xl hover:text-blue-500 transition-colors"><i class="fa-solid fa-volume"></i></button>
            </div>
        </div>`;
        wordcontainer.appendChild(card);
    });
}

const displaylesson = (lessons) => {
    const levelcontainer = document.getElementById("level-container");
    levelcontainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadlevelword(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open-reader"></i>
        Lesson-${lesson.level_no}</button>`;

        levelcontainer.appendChild(btnDiv);
    }
}

loadlesson();