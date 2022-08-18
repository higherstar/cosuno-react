import app from './app';

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', async (err) => {
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Online Node server is online.`);
  console.log(`PORT: ${PORT}`);
});

