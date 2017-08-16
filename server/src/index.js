import express from 'express';
import path from 'path';

const PORT = 3000;

let app = express();

app.set('view engine', 'hbs');
app.set('views', 'server/views')
app.use(express.static('server/assets'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Coding Test' });
});

app.listen(PORT, () => {
	console.log('App being served @ http://localhost:3000');
});

export default app;