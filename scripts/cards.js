document.addEventListener("DOMContentLoaded", () => {
    loadCards(); 
});

document.getElementById("cardForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    let profession = document.getElementById("profession").value.trim();
    let email = document.getElementById("email").value.trim();


    if (!/^[A-Za-zא-ת]{2,}$/.test(name)) {
        alert("שם חייב לכלול לפחות 2 אותיות ולא מספרים.");
        return;
    }


    profession = profession.replace(/פקיד/g, "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        email = "valid@email.com"; 
    }

    addCard(name, profession, email);
    saveCards(); 
    document.getElementById("cardForm").reset(); 
});

function addCard(name, profession, email) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${name}</h3>
        <p>מקצוע: ${profession}</p>
        <p>Email: ${email}</p>
        <button class="delete-btn">❌</button>
    `;

    
    card.querySelector(".delete-btn").addEventListener("click", function() {
        card.remove();
        saveCards(); 
    });

    document.getElementById("cardsContainer").appendChild(card);
}


function saveCards() {
    const cards = [];
    document.querySelectorAll(".card").forEach(card => {
        const name = card.querySelector("h3").innerText;
        const profession = card.querySelector("p:nth-of-type(1)").innerText.replace("מקצוע: ", "");
        const email = card.querySelector("p:nth-of-type(2)").innerText.replace("Email: ", "");
        cards.push({ name, profession, email });
    });
    localStorage.setItem("cards", JSON.stringify(cards));
}

function loadCards() {
    const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    savedCards.forEach(card => {
        addCard(card.name, card.profession, card.email);
    });
}