import express from 'express';
import path from 'path';

const PORT = 3000;

let app = express();

app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static('assets'));

app.listen(PORT, () => {
  console.log('App being served @ http://localhost:3000');
});

export default app;
