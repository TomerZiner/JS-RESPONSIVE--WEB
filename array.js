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

function renderCards(cards) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    if (cards.length === 0) {
        container.innerHTML = '<p>לא נמצאו תוצאות</p>';
        return;
    }
    cards.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Age:</strong> ${item.age}</p>
        <p><strong>Admin:</strong> ${item.admin}</p>
        <p><strong>Grades:</strong> ${item.grades.join(', ')}</p>
        <p><strong>Address:</strong> ${item.address.city}, House #${item.address.houseNumber}</p>
      `;
        container.appendChild(card);
    });
}


renderCards(data);


document.getElementById('findBtn').addEventListener('click', function () {
    const field = document.getElementById('fieldSelect').value;
    const filterVal = document.getElementById('filterInput').value.trim();
    let filtered = [];

    if (field === 'age') {
        const num = parseFloat(filterVal);
        filtered = data.filter(item => item.age > num);
    } else if (field === 'name') {
        filtered = data.filter(item => item.name.toLowerCase().includes(filterVal.toLowerCase()));
    } else if (field === 'admin') {
        if (filterVal.toLowerCase() === "true") {
            filtered = data.filter(item => item.admin === true);
        } else if (filterVal.toLowerCase() === "false") {
            filtered = data.filter(item => item.admin === false);
        }
    } else if (field === 'grades') {
        const num = parseFloat(filterVal);
        filtered = data.filter(item => {
            const avg = item.grades.reduce((a, b) => a + b, 0) / item.grades.length;
            return avg > num;
        });
    } else if (field === 'address') {

        const parts = filterVal.split('.');
        if (parts.length === 2) {
            const [fieldName, value] = parts;
            filtered = data.filter(item => {
                if (item.address && item.address[fieldName]) {
                    return item.address[fieldName].toString().toLowerCase() === value.toLowerCase();
                }
                return false;
            });
        }
    }
    renderCards(filtered);
});

document.getElementById('allGradesBtn').addEventListener('click', function () {
    const filterVal = parseFloat(document.getElementById('filterInput').value.trim());
    const filtered = data.filter(item => item.grades.every(grade => grade > filterVal));
    renderCards(filtered);
});

document.getElementById('someGradesBtn').addEventListener('click', function () {
    const filterVal = parseFloat(document.getElementById('filterInput').value.trim());
    const filtered = data.filter(item => item.grades.some(grade => grade > filterVal));
    renderCards(filtered);
});

document.getElementById('manipulateBtn').addEventListener('click', function () {
    const inputVal = parseFloat(document.getElementById('filterInput').value.trim());
    const filtered = data.filter(item => {
        const avg = item.grades.reduce((a, b) => a + b, 0) / item.grades.length;
        return avg < inputVal && item.address.houseNumber > inputVal;
    }).map(item => {
        return { ...item, age: item.age + inputVal };
    });
    renderCards(filtered);
});



function caesarCipher(str, shift, encrypt = true) {
    return str.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = (code >= 65 && code <= 90) ? 65 : 97;
            if (encrypt) {
                return String.fromCharCode(((code - base + shift) % 26) + base);
            } else {
                return String.fromCharCode(((code - base - shift + 26) % 26) + base);
            }
        }
        return char;
    }).join('');
}

document.getElementById('encryptBtn').addEventListener('click', function () {
    const text = document.getElementById('cipherText').value;
    const shift = parseInt(document.getElementById('shiftNumber').value, 10);
    if (isNaN(shift)) {
        alert('הזן מספר תקין עבור השיפט.');
        return;
    }
    const encrypted = caesarCipher(text, shift, true);
    document.getElementById('cipherResult').textContent = 'Encrypted: ' + encrypted;
});

document.getElementById('decryptBtn').addEventListener('click', function () {
    const text = document.getElementById('cipherText').value;
    const shift = parseInt(document.getElementById('shiftNumber').value, 10);
    if (isNaN(shift)) {
        alert('הזן מספר תקין עבור השיפט.');
        return;
    }
    const decrypted = caesarCipher(text, shift, false);
    document.getElementById('cipherResult').textContent = 'Decrypted: ' + decrypted;
});
