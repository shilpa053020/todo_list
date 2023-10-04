//import packages
import express from "express"

//app
const app = express();
app.use(express.json());



//id generate
let counter = 1;
function generateUniqueId() {
    return counter++;
}
const todolist = [
    { id: generateUniqueId(), title: "todo", description: "completed by today" }
]

//get data
app.get("/get", (req, res) => {
    res.status(200).json(todolist)
    console.log(todolist);
})

//create data
app.post("/create", (req, res) => {
    const data = ({
        id: generateUniqueId(),
        title: req.body.title,
        description: req.body.description
    })
    todolist.push(data)
    res.status(200).json(data)
    console.log(data);

})

//update
app.put("/update", (req, res) => {
    const update = ({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    })
    const index = todolist.findIndex(item => item.id === update.id)
    console.log(index);
    if (index != -1) {
        todolist[index] = update
        res.status(200).json(update)

    } else {
        res.status(404).json("invalid id")
    }

})

//delete 
app.delete("/del/:id", (req, res) => {
    const remove = parseInt(req.params.id)
    console.log(remove);
    const index = todolist.findIndex(item => item.id === remove)
    console.log(index);
    if (index != -1) {
        todolist.splice(index, 1)
        res.status(200).json("deleted successfully")
        console.log("deleted");
    } else {
        res.status(404).json("invalid id")
    }

})

//server connection
app.listen(5000, () => {
    console.log("server connected to port number 5000");
})


