import app from './config/express';
import { connect } from './config/mongoose';
import { port } from './config/vars';

console.log('starting app');
// open mongoose connection
connect();

// listen to requests
app.listen(port, () => {
  console.log(`app listing on port ${port}`);
});

export default app;