import app from './app';
const PORT = process.env.PORT || 1990;

app.listen(PORT, () => {
    console.log(`Library API running on Port : ${PORT}`);
});