// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const fs = require("fs");

    fs.writeFile("public/output.txt", req.query.encryptedText, (err) => {
        if (err) {
            console.error(err);
        }
    })
}
