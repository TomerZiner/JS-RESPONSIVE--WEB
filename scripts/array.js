const usersArray = [
    {
        age: 16,
        name: 'yossi',
        admin: true,
        grades: [20, 23, 50, 30],
        address: {
            city: 'ashdod',
            houseNumber: 12
        }
    },
    {
        age: 25,
        name: 'yael',
        admin: false,
        grades: [50, 16, 100, 78],
        address: {
            city: 'ashdod',
            houseNumber: 8
        }
    },
    {
        age: 22,
        name: 'idan',
        admin: false,
        grades: [100, 100, 100, 30],
        address: {
            city: 'tel aviv',
            houseNumber: 40
        }
    },
    {
        age: 29,
        name: 'yarden king',
        admin: true,
        grades: [99, 99, 99, 99],
        address: {
            city: 'kfar bialik',
            houseNumber: 1
        }
    },
    {
        age: 34,
        name: 'banu',
        admin: true,
        grades: [100, 100, 100, 100],
        address: {
            city: 'ashdod',
            houseNumber: 16
        }
    },
    {
        age: 57,
        name: 'nabetjs',
        admin: false,
        grades: [3, 16, 0, 30],
        address: {
            city: 'tel aviv',
            houseNumber: 12
        }
    },
    {
        age: 15,
        name: 'rongular',
        admin: true,
        grades: [92, 87, 69, 84],
        address: {
            city: 'yafo',
            houseNumber: 12
        }
    },
    {
        age: 10,
        name: 'david',
        admin: false,
        grades: [20, 23, 50, 30],
        address: {
            city: 'ashdod',
            houseNumber: 12
        }
    },
    {
        age: 66,
        name: 'liad',
        admin: false,
        grades: [92, 76, 77, 82],
        address: {
            city: 'beit dagan',
            houseNumber: 112
        }
    },
    {
        age: 34,
        name: 'happy',
        admin: true,
        grades: [54, 23, 100, 30],
        address: {
            city: 'beit dagan',
            houseNumber: 112
        }
    },
];

function renderCards(array) {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = "";
    array.forEach(user => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <h3>${user.name}</h3>
      <p>Age: ${user.age}</p>
      <p>Admin: ${user.admin}</p>
      <p>Grades: ${user.grades.join(", ")}</p>
      <p>City: ${user.address.city}</p>
      <p>House Number: ${user.address.houseNumber}</p>
    `;
        container.appendChild(card);
    });
}

renderCards(usersArray);

document.getElementById("findBtn").addEventListener("click", () => {
    const field = document.getElementById("fieldSelect").value;
    const input = document.getElementById("filterInput").value.trim();
    let filtered = [];

    if (field === "age") {
        const ageInput = parseFloat(input);
        filtered = usersArray.filter(user => user.age > ageInput);
    } else if (field === "name") {
        filtered = usersArray.filter(user => user.name.toLowerCase().includes(input.toLowerCase()));
    } else if (field === "admin") {
        const boolVal = input.toLowerCase() === "true";
        filtered = usersArray.filter(user => user.admin === boolVal);
    } else if (field === "grades") {
        const num = parseFloat(input);
        filtered = usersArray.filter(user => {
            const avg = user.grades.reduce((a, b) => a + b, 0) / user.grades.length;
            return avg > num;
        });
    } else if (field === "address") {
        const parts = input.split(".");
        if (parts.length === 2) {
            const addrField = parts[0].trim();
            const addrValue = parts[1].trim().toLowerCase();
            filtered = usersArray.filter(user => {
                if (user.address[addrField] !== undefined) {
                    return String(user.address[addrField]).toLowerCase() === addrValue;
                }
                return false;
            });
        }
    }
    renderCards(filtered);
});

document.getElementById("allGradesBtn").addEventListener("click", () => {
    const input = parseFloat(document.getElementById("filterInput").value.trim());
    const filtered = usersArray.filter(user => user.grades.every(grade => grade > input));
    renderCards(filtered);
});

document.getElementById("someGradesBtn").addEventListener("click", () => {
    const input = parseFloat(document.getElementById("filterInput").value.trim());
    const filtered = usersArray.filter(user => user.grades.some(grade => grade > input));
    renderCards(filtered);
});

document.getElementById("manipulationBtn").addEventListener("click", () => {
    const input = parseFloat(document.getElementById("filterInput").value.trim());
    const filtered = usersArray.filter(user => {
        const avg = user.grades.reduce((a, b) => a + b, 0) / user.grades.length;
        return avg < input && user.address.houseNumber > input;
    }).map(user => {
        let newUser = { ...user };
        newUser.age = newUser.age + input;
        return newUser;
    });
    renderCards(filtered);
});

