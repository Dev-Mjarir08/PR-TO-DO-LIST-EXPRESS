
import express from 'express';
const app = express();
const PORT = 8081;
let todos = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.render('index', { todos })
})

app.post('/create', (req, res) => {
    let todo = {
        id: Date.now(),
        text: req.body.text
    };

    todos.push(todo);
    console.log(todos);
    
    res.redirect('/');
});

app.get('/delete/todo', (req, res) => {
    const { id } = req.query;
    todos = todos.filter((todo) => todo.id != id);  
    res.redirect('/');
});

app.get('/edit/todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id == id);
    return res.render('edit', { todo });
});

app.post('/edit/todo/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.map((todo) => {
        if (todo.id == id) {
            return {...todo , text : req.body.text};
        }
        return todo;
    });
    res.redirect('/');
});



app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Start Server");
        console.log(`http://localhost:${PORT}`);
    }
})
