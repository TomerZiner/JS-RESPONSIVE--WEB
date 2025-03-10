function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('he-IL', options);
    const formattedTime = now.toLocaleTimeString('he-IL');

    document.getElementById("datetime").innerHTML = `${formattedDate} - ${formattedTime}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();