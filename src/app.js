import express from 'express';
import coursesRouter from './routes/courses.routes.js';


function corsSettings (req, res, next) {
  var allowedDomains = ['https://smm-solutions-dashboard.onrender.com','https://smm-solutions-website.onrender.com' ];
  var origin = req.headers.origin;
  if(allowedDomains.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  switch (origin) {
    case allowedDomains[0]:
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      break;
    default:
      res.setHeader('Access-Control-Allow-Methods', 'GET');    
  }

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
}

const app = express()
app.use(corsSettings);
app.use(express.json());
app.use('/api', coursesRouter);

export default app;