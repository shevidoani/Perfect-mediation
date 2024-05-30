// const express = require('express');
// const db = require('../controllers/');
// const router = express.Router();

// // GET endpoint to fetch all todos for a specific user
// router.get('/', async (req, res) => {
//   try {
//     const userId = req.query.userId;
//     if (!userId) {
//       return res.status(400).json({ error: 'userId parameter is required' });
//     }

//     const todos = await db.getAllUserTodo(userId);
//     res.json(todos);
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//     res.status(500).json({ error: 'Failed to fetch todos' });
//   }
// });

// // GET endpoint to fetch a specific todo by its id
// router.get('/:id', async (req, res) => {
//   try {
//     const todoId = req.params.id;
//     if (!todoId) {
//       return res.status(400).json({ error: 'Todo id parameter is required' });
//     }

//     const todo = await db.getSingleTodo(todoId);

//     if (!todo.length) {
//       return res.status(404).json({ error: 'Todo not found' });
//     }

//     res.json(todo[0]);
//   } catch (error) {
//     console.error('Error fetching todo:', error);
//     res.status(500).json({ error: 'Failed to fetch todo' });
//   }
// });

// // POST endpoint to add a new todo
// router.post('/', async (req, res) => {
//   try {
//     const { userId, title, completed } = req.body;
//     if (!userId || !title) {
//       return res.status(400).json({ error: 'userId and title are required' });
//     }

//     const newTodo = await db.addNewTodo(userId, title, completed);

//     res.status(201).json(newTodo);
//   } catch (error) {
//     console.error('Error adding todo:', error);
//     res.status(500).json({ error: 'Failed to add todo' });
//   }
// });

// // PATCH endpoint to update a todo
// router.patch('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, completed } = req.body;

//     if (!title && typeof completed !== 'boolean') {
//       return res.status(400).json({ error: 'Title or completed status must be provided for update' });
//     }

//     await db.updateTodo(id, title, completed);

//     res.json({ message: 'Todo updated successfully' });
//   } catch (error) {
//     console.error('Error updating todo:', error);
//     res.status(500).json({ error: 'Failed to update todo' });
//   }
// });

// // DELETE endpoint to delete a todo
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     await db.deleteTodo(id);

//     res.json({ message: 'Todo deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting todo:', error);
//     res.status(500).json({ error: 'Failed to delete todo' });
//   }
// });

// module.exports = router;
