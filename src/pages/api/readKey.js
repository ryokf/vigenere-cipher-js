// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const fs = require("fs");

    fs.readFile("public/key.txt", "ascii", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(data)

        res.status(200).json({ data: data });
    });

}
