const express = require('express')
var mysql = require('mysql')
const app = express()
const port = 3000


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'library'
});

connection.connect();

app.get('/', (req, res) => {
    res.sendFile('/public/index.html', {root: __dirname})
})

app.get('/books', (req, res) => {
    res.sendFile('/public/books.html', {root: __dirname})
})

app.get('/rent', (req, res) => {
    res.sendFile('/public/rent.html', {root: __dirname})
})

app.get('/add-book', (req, res) => {
    res.sendFile('/public/add-book.html', {root: __dirname})
})

app.get('/state', (req, res) => {
    // res.sendFile('/public/rent.html', {root: __dirname})
    return "Bu sayfayı yapmayı unutma!"
})


app.get('/get-all-books', (req, res) => {
    connection.query('SELECT * FROM books WHERE deleted = 0;', function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results[0].solution);
        res.send(results)
      });
})


app.post('/delete/', express.json({type: '*/*'}), (req, res) => {
    let data = req.body

    let date = new Date();
    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    // console.log(date)

    // res.send(data)
    connection.query(`UPDATE books SET deleted = '1', del_date='${date}' WHERE id = '${data.id}';`, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
})


app.post('/auto-delete/', express.json({type: '*/*'}), (req, res) => {
    let data = req.body
    let date = new Date();
    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    // console.log(date)

    // res.send(data)
    connection.query(`UPDATE books SET deleted = '1', del_date='${date}' WHERE id = '${data.id}';`, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
})













app.post('/save-book',express.json({type: '*/*'}), (req, res) => {
    let data = req.body
    connection.query(`SELECT * FROM books WHERE name = '${data.name}' AND author = '${data.author}';`, function (error, results, fields) {
        if(results.length != 0){
            let id = results[0].id;
            let amount = results[0].amount;
            amount = amount + 1;
            // UPDATE öğrenciler SET isim = ‘Ahmet Kerim’ WHERE no = 300;
            connection.query(`UPDATE books SET amount = '${amount}' WHERE id = '${id}'`, function(error, sonuc, field){
                if(sonuc.affectedRows == 1)
                    res.send('200')
                else{
                    res.send('Güncelleme Hatası')
            }
            })
            
        }
        else{
            connection.query(`INSERT INTO books (name, author, genre, page, amount) VALUES 
            ('${data.name}', '${data.author}', '${data.genre}', '${data.page}', '${data.amount}')`, 
                function (error, results, fields) {
                    if(results.affectedRows == 1)
                        res.send(results)
                    else{
                        res.send('Hata')
                    }
                }
            );
            
        }
    });



    // Yeni kayıt ekleyen blok

})

















// public klasöründeki css ve js kaynaklarına erişim için 
app.use(express.static(__dirname + '/public'))


app.listen(port, () => {

  console.log(`Uygulama Sunucusu ${port} Portundan Çalışıyor...`)
})