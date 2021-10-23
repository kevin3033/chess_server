const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

const port = 3000
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve()+'/public/index.html'))
})
app.get('/sala', (req, res) => {
    res.sendFile(path.join(path.resolve()+'/public/jogo.html'))
})

let salas = []
let jogadores = 0

io.on('connection', socket => {

    if (jogadores % 2 == 0) {
        console.log('nenhuma sala '+ salas.length)
        socket.emit('sala', 'nova')
        socket.on('novasala', data =>{
            salas.push({host: data, oponente: null})
            socket.join(salas[salas.length-1].host.nome)

            jogadores++
        })
    } else {
        console.log('entrando na sala ' + salas.length);
        socket.emit('sala', 'velha')
        socket.on('dados', data => {
            io.to(salas[salas.length-1].host.nome).emit('adversario', data)
            socket.join(salas[salas.length-1].host.nome)
            socket.emit('adversario', salas[salas.length-1].host)
            salas[salas.length-1].oponente = data
            jogadores++
        })
    }
})

server.listen(port, err => {
    if (err) {
        console.log('erro: ' + err)
    } else {
        console.log('server rodando em: http://0.0.0.0:'+ port)
    }
})
