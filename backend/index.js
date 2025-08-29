const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); 

app.get('/bfhl', (req, res) => {
    try {
        // Send a successful response with a static operation code
        res.status(200).json({ "operation_code": 1 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: 'nilashish_de_ddmmyyyy',
                error: "Invalid input: 'data' field must be an array."
            });
        }

        const user_id = "nilashish_de_10032004"; 
        const email = "nilashish.de2022@vitstudent.ac.in";
        const roll_number = "22BCE3248";

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        data.forEach(item => {
            if (/^\d+$/.test(item)) {
                const num = parseInt(item, 10);
                sum += num;
                (num % 2 === 0) ? even_numbers.push(String(item)) : odd_numbers.push(String(item));
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
            } else {
                special_characters.push(String(item));
            }
        });

        const reversed_alphabets = alphabet_string.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            concat_string += (i % 2 === 0) ? reversed_alphabets[i].toUpperCase() : reversed_alphabets[i].toLowerCase();
        }

        const response = {
            is_success: true,
            user_id,
            email,
            roll_number,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string
        };

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            user_id: 'nilashish_de_10032004',
            error: `An unexpected error occurred: ${error.message}`
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend server is live on http://localhost:${PORT}`);
});