import express from "express";
const app = express();
app.get("/eita", (req, res) => {
    res.json({ msg: "ele gosta" });
});
app.listen(4000, () => {
    console.log("server: BILL");
});
