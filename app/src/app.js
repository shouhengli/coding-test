import express from 'express';
import path from 'path';

const PORT = 3000;

let app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

app.listen(PORT, () => {
	console.log('App being served @ http://localhost:3000');
});

export default app;
