import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

export default router;