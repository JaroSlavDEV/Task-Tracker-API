const express = require('express');
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');

const app = express();

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/task', taskRoute);

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
