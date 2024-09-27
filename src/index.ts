import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getTodos, createTodo, updateTodo, deleteTodo } from './todoController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/todos', getTodos);
app.post('/todos', createTodo);
app.put('/todos/:id', updateTodo);
app.delete('/todos/:id', deleteTodo);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
