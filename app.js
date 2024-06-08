import express from "express";
import router from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);


//configurar puerto
app.listen(8080, () => {
    console.log("server ready on port 8080");
});


