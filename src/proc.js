const fs = require('fs');
const readline = require('readline');

async function processFile() {
    const fileStream = fs.createReadStream('C:\\proj\\legal-ethics-mockbar2024\\src\\le.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let question = {
        "questionId": null,
        "text": ""
    };
    let questions = [];

    for await (const line of rl) {
        const match = line.match(/^(\d+)\./);
        if (match) {
            if (question.questionId !== null) {
                questions.push(question);
                question = {
                    "questionId": null,
                    "text": ""
                };
            }
            question.questionId = match[1];
        }
        question.text += line.trim() + "\n";
    }

    // Push the last question
    if (question.questionId !== null) {
        questions.push(question);
    }

    console.log(JSON.stringify(questions, null, 2));
}

processFile();