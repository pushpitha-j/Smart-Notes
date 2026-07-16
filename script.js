const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

const searchInput =
document.getElementById("searchInput");

let notes = document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();


function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click",()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";

    const colors = [
    "#FFF8B5",
    "#FFD6E8",
    "#D6F5FF",
    "#D8FFD6",
    "#F8E8FF",
    "#FFE6CC"
    ];

    inputBox.style.background =
    colors[Math.floor(Math.random() * colors.length)];

    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})


searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const notes =
    document.querySelectorAll(".input-box");

    notes.forEach(note => {

        if(note.innerText.toLowerCase().includes(value)){

            note.style.display="block";

        }else{

            note.style.display="none";

        }

    });

});

const themeBtn = document.getElementById("themeBtn");

// Load saved theme
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    themeBtn.innerHTML = "☀️ Light Mode";
}

// Toggle theme
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.innerHTML = "☀️ Light Mode";
        localStorage.setItem("theme","dark");
    }else{
        themeBtn.innerHTML = "🌙 Dark Mode";
        localStorage.setItem("theme","light");
    }

});

const exportBtn = document.getElementById("exportBtn");

exportBtn.addEventListener("click", () => {

    let content = "";

    document.querySelectorAll(".input-box").forEach((note, index) => {

        content += `Note ${index + 1}\n`;
        content += note.innerText + "\n";
        content += "--------------------------\n\n";

    });

    const blob = new Blob([content], { type: "text/plain" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    const today = new Date().toISOString().split("T")[0];
    link.download = `SmartNotes-${today}.txt`;

    link.click();
    alert("Notes exported successfully!");

    URL.revokeObjectURL(link.href);
});