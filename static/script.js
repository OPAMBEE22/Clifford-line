document.getElementById('checkBtn').addEventListener('click', async function () {
    const symptomsInput = document.getElementById('symptoms').value;
    const symptoms = symptomsInput.toLowerCase().split(',').map(symptom => symptom.trim());
    const severity = document.getElementById('severity').value;

    try {
        // Call the Gemmi API with the symptoms and severity
        const response = await fetch('/diagnose', {  // Replace with actual API endpoint
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptoms: symptoms, severity: severity })
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            const diagnosis = data.diagnosis || "No matching diagnosis found. Please consult a healthcare professional.";
            const healthTips = data.tips ? `
                <h3>Health Tips:</h3>
                <ul>
                    ${data.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            ` : "No personalized recommendations found.";

            document.getElementById('diagnosis').innerText = diagnosis;
            document.getElementById('healthTips').innerHTML = healthTips;
        } else {
            document.getElementById('diagnosis').innerText = "An error occurred. Please try again later.";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('diagnosis').innerText = "An error occurred. Please try again later.";
    }
});

document.getElementById('learnMoreBtn').addEventListener('click', function () {
    document.getElementById('moreInfo').innerText = "Detailed information about the diagnosis...";
    document.getElementById('moreInfo').style.display = "block";
});

document.getElementById('emailBtn').addEventListener('click', function () {
    const diagnosis = document.getElementById('diagnosis').innerText;
    window.location.href = `mailto:?subject=My Diagnosis&body=${encodeURIComponent(diagnosis)}`;
});

document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const message = document.getElementById('message').value;

    if (name && email && date && time) {
        alert(`Appointment scheduled for ${date} at ${time}.\nDetails: \nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
        document.getElementById('appointmentForm').reset();
        // Add code to send this data to a server or store it as needed
    } else {
        alert('Please fill in all required appointment details.');
    }
});
