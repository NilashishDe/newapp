document.getElementById('data-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputElement = document.getElementById('data-input');
    const responseOutput = document.getElementById('response-output');
    
    // Get the raw input and split it into an array
    const rawInput = inputElement.value;
    const dataArray = rawInput.split(',').map(item => item.trim());

    // Show a loading message
    responseOutput.textContent = 'Processing...';

    try {
        // The URL of your running backend server
        const apiUrl = 'http://localhost:3000/bfhl';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: dataArray }),
        });

        const result = await response.json();

        // Display the formatted JSON response
        responseOutput.textContent = JSON.stringify(result, null, 2);

    } catch (error) {
        // Display any errors
        responseOutput.textContent = `Error: ${error.message}`;
        console.error('There was an error making the API call:', error);
    }
});