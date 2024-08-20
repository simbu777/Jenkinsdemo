// const express = require('express');
// const app = express();
// const port = 3000;

// // Basic route to return a JSON message
// app.get('/', (req, res) => {
//   res.json({ message: 'Hello, world!' });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const app = express();
const port = 3001;

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
