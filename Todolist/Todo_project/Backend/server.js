const express = require("express")

const app = express();

app.use(express.json());

let todo = []

// findindex 
const findatindex = (id) => {

    for (let i = 0; i < todo.length; i++) {
        if (todo[i].id === id) {
            return i
        }
    }
    return -1
}

//get
app.get("/gettodo", (req, res) => {
    res.send(todo)
})


app.post("/create", (req, res) => {
    const newtodo = {
        id: Math.floor(Math.random() * 10000),
        title: req.body.title,
        description: req.body.description
    }

    todo.push(newtodo)

    res.send(newtodo)
})


app.put("/update", (req, res) => {

    const index = findatindex(req.body.id)
    const newtodo = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    }
    todo[index] = newtodo

    return res.send(todo[index])
})

function removeitem(id) {
    let arr = []

    for (let i = 0; i < todo.length; i++) {
        if (todo[i].id != id) {
            arr.push(todo[i])
        }
    }
    return arr
}

app.delete("/delete/:id", (req, res) => {
    // console.log(typeof (req.params.id));
    // const index = findatindex(parseInt(req.params.id))

    todo = removeitem(parseInt(req.params.id))

    return res.send("item deleted")

})

app.listen(5000, () => {
    console.log("Server is listening");
})