import app from './app';

// probar la conecion ala db import './database/connection'

app.listen(app.get('port'));

console.log('server on por', app.get('port'));