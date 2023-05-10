const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const KEY = '--- YOUR KEY HERE ---';
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: KEY,
});
const openai = new OpenAIApi(configuration);


// LANGUAGE CONVERTER ROUTES
app.post('/convert-language', async (req, res) => {

    const { from, to, text } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `convert this text: ${text} from ${from} language to ${to} language`,
        max_tokens: 500,
    });

    res.send({
        data: completion.data
    });

});


// EMAIL GENERATOR ROUTES
app.post('/generate-email', async (req, res) => {

    const { style, points } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `generate an email in ${style} style, with the following points: ${points}`,
        max_tokens: 500,
    });

    res.send({
        data: completion.data
    });

});

// CONVERT CODE ROUTES
app.post('/convert-code', async (req, res) => {

    const { from, to, code } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `convert this code: ${code} from is in ${from} programming language to ${to} programming language`,
        max_tokens: 500,
    });

    res.send({
        data: completion.data
    });

});


// ARTICLE WRITE ROUTES
// route to generate long tail keywords
app.post('/article-writer-keywords', async (req, res) => {

    const { keyword } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `generate 5 long tail keywords for ${keyword} as a string, separated by --- and without any numbers`,
        max_tokens: 500,
    });

    res.send({
        data: completion.data
    });

});

app.post('/article-writer', async (req, res) => {

    const { keyword } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `generate an article for ${keyword}, in html format`,
        max_tokens: 1000,
    });

    res.send({
        data: completion.data
    });

});

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});