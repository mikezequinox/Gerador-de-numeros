import mysql from 'mysql2'

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mikeequinox',
  database: 'dados'
})

db.connect(err => {
  if(err){
    console.error('Erro ao conectar ao MySQL:', err.message)
    return
  }
  console.log('Conectado ao banco MySQL!')
})
