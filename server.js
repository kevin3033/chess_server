//imports
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const { Chess } = require('chess.js')
//ports
const port = process.env.PORT || 3000


app.use(express.static('public'))
//rota GET /
app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve()+'/public/index.html'))
})
//rota GET /sala
app.get('/sala', (req, res) => {
    res.sendFile(path.join(path.resolve()+'/public/jogo.html'))
})

/****interface sala:*****
  {
      id: Int,
      turno: string,
      player1: obj,
      player2: obj,
      partida: Chess,
      tabuleiro: obj
  }
***********************/

let salas = [{id:'1', turno: 'brancas', player1: {nome: null, descricao: null}, player2: {nome: null, descricao: null}, partida: new Chess(), tabuleiro: {a8: 'R',b8: 'N',c8: 'B',d8: 'Q',e8: 'K',f8: 'B',g8: 'N',h8: 'R',a7: 'P',b7: 'P',c7: 'P',d7: 'P',e7: 'P',f7: 'P',g7: 'P',h7: 'P',a6: ' ',b6: ' ',c6: ' ',d6: ' ',e6: ' ',f6: ' ',g6: ' ',h6: ' ',a5: ' ',b5: ' ',c5: ' ',d5: ' ',e5: ' ',f5: ' ',g5: ' ',h5: ' ',a4: ' ',b4: ' ',c4: ' ',d4: ' ',e4: ' ',f4: ' ',g4: ' ',h4: ' ',a3: ' ',b3: ' ',c3: ' ',d3: ' ',e3: ' ',f3: ' ',g3: ' ',h3: ' ',a2: 'P',b2: 'P',c2: 'P',d2: 'P',e2: 'P',f2: 'P',g2: 'P',h2: 'P',a1: 'R',b1: 'N',c1: 'B',d1: 'Q',e1: 'K',f1: 'B',g1: 'N',h1: 'R'}},
             {id:'2', turno: 'brancas', player1: {nome: null, descricao: null}, player2: {nome: null, descricao: null}, partida: new Chess(), tabuleiro: {a8: 'R',b8: 'N',c8: 'B',d8: 'Q',e8: 'K',f8: 'B',g8: 'N',h8: 'R',a7: 'P',b7: 'P',c7: 'P',d7: 'P',e7: 'P',f7: 'P',g7: 'P',h7: 'P',a6: ' ',b6: ' ',c6: ' ',d6: ' ',e6: ' ',f6: ' ',g6: ' ',h6: ' ',a5: ' ',b5: ' ',c5: ' ',d5: ' ',e5: ' ',f5: ' ',g5: ' ',h5: ' ',a4: ' ',b4: ' ',c4: ' ',d4: ' ',e4: ' ',f4: ' ',g4: ' ',h4: ' ',a3: ' ',b3: ' ',c3: ' ',d3: ' ',e3: ' ',f3: ' ',g3: ' ',h3: ' ',a2: 'P',b2: 'P',c2: 'P',d2: 'P',e2: 'P',f2: 'P',g2: 'P',h2: 'P',a1: 'R',b1: 'N',c1: 'B',d1: 'Q',e1: 'K',f1: 'B',g1: 'N',h1: 'R'}},
             {id:'3', turno: 'brancas', player1: {nome: null, descricao: null}, player2: {nome: null, descricao: null}, partida: new Chess(), tabuleiro: {a8: 'R',b8: 'N',c8: 'B',d8: 'Q',e8: 'K',f8: 'B',g8: 'N',h8: 'R',a7: 'P',b7: 'P',c7: 'P',d7: 'P',e7: 'P',f7: 'P',g7: 'P',h7: 'P',a6: ' ',b6: ' ',c6: ' ',d6: ' ',e6: ' ',f6: ' ',g6: ' ',h6: ' ',a5: ' ',b5: ' ',c5: ' ',d5: ' ',e5: ' ',f5: ' ',g5: ' ',h5: ' ',a4: ' ',b4: ' ',c4: ' ',d4: ' ',e4: ' ',f4: ' ',g4: ' ',h4: ' ',a3: ' ',b3: ' ',c3: ' ',d3: ' ',e3: ' ',f3: ' ',g3: ' ',h3: ' ',a2: 'P',b2: 'P',c2: 'P',d2: 'P',e2: 'P',f2: 'P',g2: 'P',h2: 'P',a1: 'R',b1: 'N',c1: 'B',d1: 'Q',e1: 'K',f1: 'B',g1: 'N',h1: 'R'}},
             {id:'4', turno: 'brancas', player1: {nome: null, descricao: null}, player2: {nome: null, descricao: null}, partida: new Chess(), tabuleiro: {a8: 'R',b8: 'N',c8: 'B',d8: 'Q',e8: 'K',f8: 'B',g8: 'N',h8: 'R',a7: 'P',b7: 'P',c7: 'P',d7: 'P',e7: 'P',f7: 'P',g7: 'P',h7: 'P',a6: ' ',b6: ' ',c6: ' ',d6: ' ',e6: ' ',f6: ' ',g6: ' ',h6: ' ',a5: ' ',b5: ' ',c5: ' ',d5: ' ',e5: ' ',f5: ' ',g5: ' ',h5: ' ',a4: ' ',b4: ' ',c4: ' ',d4: ' ',e4: ' ',f4: ' ',g4: ' ',h4: ' ',a3: ' ',b3: ' ',c3: ' ',d3: ' ',e3: ' ',f3: ' ',g3: ' ',h3: ' ',a2: 'P',b2: 'P',c2: 'P',d2: 'P',e2: 'P',f2: 'P',g2: 'P',a1: 'R',b1: 'N',c1: 'B',d1: 'Q',e1: 'K',f1: 'B',g1: 'N',h1: 'R'}},
             {id:'5', turno: 'brancas', player1: {nome: null, descricao: null}, player2: {nome: null, descricao: null}, partida: new Chess(), tabuleiro: {a8: 'R',b8: 'N',c8: 'B',d8: 'Q',e8: 'K',f8: 'B',g8: 'N',h8: 'R',a7: 'P',b7: 'P',c7: 'P',d7: 'P',e7: 'P',f7: 'P',g7: 'P',h7: 'P',a6: ' ',b6: ' ',c6: ' ',d6: ' ',e6: ' ',f6: ' ',g6: ' ',h6: ' ',a5: ' ',b5: ' ',c5: ' ',d5: ' ',e5: ' ',f5: ' ',g5: ' ',h5: ' ',a4: ' ',b4: ' ',c4: ' ',d4: ' ',e4: ' ',f4: ' ',g4: ' ',h4: ' ',a3: ' ',b3: ' ',c3: ' ',d3: ' ',e3: ' ',f3: ' ',g3: ' ',h3: ' ',a2: 'P',b2: 'P',c2: 'P',d2: 'P',e2: 'P',f2: 'P',g2: 'P',h2: 'P',a1: 'R',b1: 'N',c1: 'B',d1: 'Q',e1: 'K',f1: 'B',g1: 'N',h1: 'R'}}]

let salasDisponiveis = 5

///////////////////////
/***interface id*****************
{
    id:
        {
            sala: string,
            player: string
        }
}
*****************************/
let players = {}

//nova conexao
io.on('connection', socket => {
    console.log('nova conexão.');

    //tela de pesquisa
    socket.on('getinfo', () => {
        socket.emit('info', {salasDisponiveis: salasDisponiveis, salas: salas})
    })
    socket.on('joinsala', data => {
        /***interface data***
            {
                sala: string,
                nome: string,
                descricao: string
            }

        *********************/
        let sala = parseInt(data.sala.replace('sala', '')) - 1
        console.log('sala: '+sala);
        if (salas[sala].player1.nome==null) {
            console.log('entrando como player1 na sala '+sala)
            //
            salas[sala].player1.nome = data.nome
            salas[sala].player1.descricao = data.descricao
            socket.join(data.sala)
            players[`${socket.id}`] = {sala: data.sala, player: 'player1'}
            ////////////////////////////
            //dizer pro socket que ele é as brancas
            socket.emit('start', {cor: 'brancas'})
            //
            ///////////////////////////////
            //avisar a sala de espera
            io.emit('info', {salasDisponiveis: salasDisponiveis, salas: salas})

            if (salas[sala].player2.nome != null) {
                socket.emit('oponente', {nome: salas[sala].player2.nome, descricao: salas[sala].player2.descricao})
                io.to(data.sala).emit('brancas', {nome: salas[sala].player1.nome,descricao: salas[sala].player1.descricao})
                io.to(data.sala).emit('resetparaexpect', {cor: 'expect', player1: {nome: salas[sala].player1.nome,descricao: salas[sala].player1.descricao}, player2: {nome: salas[sala].player2.nome,descricao: salas[sala].player2.descricao}})
            }

            //
        } else if (salas[sala].player2.nome == null) {
            console.log('entrando como player2 na sala '+sala)
            //
            salas[sala].player2.nome = data.nome
            salas[sala].player2.descricao = data.descricao
            socket.join(data.sala)
            ////////////////////////
            //avisa a sala de espera
            players[`${socket.id}`] = {sala: data.sala, player: 'player2'}
            io.emit('info', {salasDisponiveis: salasDisponiveis, salas: salas})
            //
            //dizer pro socket que ele é as negras
            socket.emit('start', {cor: 'pretas'})
            //
            ////////////////////////
            //avisar o outro player para iniciar a partida
            ////////////////////////
            io.to(data.sala).emit('oponente', {nome: data.nome, descricao: data.descricao})
            io.to(data.sala).emit('resetparaexpect', {cor: 'expect', player1: {nome: salas[sala].player1.nome,descricao: salas[sala].player1.descricao}, player2: {nome: salas[sala].player2.nome,descricao: salas[sala].player2.descricao}})
            //
            //manda as brancas pras negras
            socket.emit('brancas', {nome: salas[sala].player1.nome,descricao: salas[sala].player1.descricao})
            //
            //
        } else {
            //sala lotada
            console.log('entrando na sala com espectador')
            socket.join(data.sala)
            //
            //avisar que o socket é expect
            socket.emit('start', {cor: 'expect', player1: {nome: salas[sala].player1.nome,descricao: salas[sala].player1.descricao}, player2: {nome: salas[sala].player2.nome,descricao: salas[sala].player2.descricao}})
            //
        }
    })
    //
    /////////////////////


    /**interface do lance**
        {
                de: string,
                para: string
                cor: string,
                sala: string
        }
    ***********************/
    socket.on('lance', data => {
        //////////
        let sala = parseInt(data.sala.replace('sala', '')) - 1
        if (data.cor == salas[sala].turno) {
            ///valida o lance
            let validando = validarlance(salas[sala].tabuleiro, data.de, data.para, sala)
            ////
            if (!validando) {
                return
            }
            /////

            if ((typeof validando) == 'string') {
                //
                let vetorvalidando = validando.split(' ')
                //
                switch (vetorvalidando[0]) {
                    //
                    case 'passagem':
                        io.to(data.sala).emit('passagem', {cor: data.cor,c1: vetorvalidando[1], c2: vetorvalidando[2], c3: vetorvalidando[3]})
                        return
                    //
                    case 'roque':
                        io.to(data.sala).emit('roque', {cor: data.cor, qual: vetorvalidando[1]})
                        return
                    //
                    case 'promocao':
                        io.to(data.sala).emit('promocao', {cor: data.cor, c1: vetorvalidando[1], c2: vetorvalidando[2]})
                        return
                    //
                }
                //
            } else {
                if (validando)
                    io.to(data.sala).emit('movimento', {cor: data.cor,c1: data.de, c2: data.para})
                    ///
            }
            ////
        }
        //////////
        else {
            console.log('não é sua vez');
            return
        }
        //////////
    })
    //

    //////////desconexao:
    //
    socket.on('disconnect', ()=> {
        if (players[`${socket.id}`]) {
            //
            let nomesala = players[`${socket.id}`].sala
            //
            let numero = (parseInt(nomesala.replace('sala', '')))-1
            //
            let player = players[`${socket.id}`].player
            //
            io.to(nomesala).emit('reset', {})
            ////////////
            salas[numero].partida.reset()
            salas[numero].tabuleiro = {a8: 'R',b8: 'N',c8: 'B',d8: 'Q',e8: 'K',f8: 'B',g8: 'N',h8: 'R',a7: 'P',b7: 'P',c7: 'P',d7: 'P',e7: 'P',f7: 'P',g7: 'P',h7: 'P',a6: ' ',b6: ' ',c6: ' ',d6: ' ',e6: ' ',f6: ' ',g6: ' ',h6: ' ',a5: ' ',b5: ' ',c5: ' ',d5: ' ',e5: ' ',f5: ' ',g5: ' ',h5: ' ',a4: ' ',b4: ' ',c4: ' ',d4: ' ',e4: ' ',f4: ' ',g4: ' ',h4: ' ',a3: ' ',b3: ' ',c3: ' ',d3: ' ',e3: ' ',f3: ' ',g3: ' ',h3: ' ',a2: 'P',b2: 'P',c2: 'P',d2: 'P',e2: 'P',f2: 'P',g2: 'P',h2: 'P',a1: 'R',b1: 'N',c1: 'B',d1: 'Q',e1: 'K',f1: 'B',g1: 'N',h1: 'R'}
            salas[numero].turno = 'brancas'
            ////////////
            salas[numero][player] = {nome: null, descricao: null}

            io.to(nomesala).emit('resetparaexpect', {cor: 'expect', player1: {nome: salas[numero].player1.nome,descricao: salas[numero].player1.descricao}, player2: {nome: salas[numero].player2.nome,descricao: salas[numero].player2.descricao}})
            //
            io.emit('info', {salasDisponiveis: salasDisponiveis, salas: salas})
            //
        }
    })
    //////////
    //
})

///funcao que valida o lance e altera as variaveis da sala.
function validarlance(tabuleiro, lance1, lance2, numero) {
    //
    if (!(tabuleiro[lance1] == ' ')){
        //
        if (true) {
            //
            if (tabuleiro[lance1] == 'K') {
                //
                console.log('lance de rei')
                if (lance1 == 'e1') {
                    //
                    console.log('e1');
                    if (lance2 == 'g1') {
                        //
                        console.log('roque curto');
                        let lance = 'O-O'
                        let retorno = salas[numero].partida.move(lance)
                        console.log(salas[numero].partida.ascii());
                        if (retorno != null) {
                            //
                            salas[numero].tabuleiro['e1'] = ' '
                            salas[numero].tabuleiro['f1'] = 'R'
                            salas[numero].tabuleiro['g1'] = 'K'
                            salas[numero].tabuleiro['h1'] = ' '
                            salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                            return `roque curto`
                        }
                    } else if (lance2 == 'c1') {
                        //
                        console.log('roque longo');
                        let lance = 'O-O-O'
                        let retorno = salas[numero].partida.move(lance)
                        console.log(salas[numero].partida.ascii());
                        if (retorno != null) {
                            //
                            salas[numero].tabuleiro['a1'] = ' '
                            salas[numero].tabuleiro['b1'] = ' '
                            salas[numero].tabuleiro['c1'] = 'K'
                            salas[numero].tabuleiro['d1'] = 'R'
                            salas[numero].tabuleiro['e1'] = ' '
                            salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                            return `roque grande`
                        }
                    }
                }
                else if (lance1 == 'e8'){
                    //
                    console.log('e8');
                    if (lance2 == 'g8') {
                        //
                        console.log('roque curto');
                        let lance = 'O-O'
                        let retorno = salas[numero].partida.move(lance)
                        console.log(salas[numero].partida.ascii());
                        if (retorno != null) {
                            //
                            salas[numero].tabuleiro['e8'] = ' '
                            salas[numero].tabuleiro['f8'] = 'R'
                            salas[numero].tabuleiro['g8'] = 'K'
                            salas[numero].tabuleiro['h8'] = ' '
                            salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                            return `roque curto`
                        }
                    } else if (lance2 == 'c8') {
                        //
                        console.log('roque longo');
                        let lance = 'O-O-O'
                        let retorno = salas[numero].partida.move(lance)
                        console.log(salas[numero].partida.ascii());
                        if (retorno != null) {
                            //
                            salas[numero].tabuleiro['a8'] = ' '
                            salas[numero].tabuleiro['b8'] = ' '
                            salas[numero].tabuleiro['c8'] = 'K'
                            salas[numero].tabuleiro['d8'] = 'R'
                            salas[numero].tabuleiro['e8'] = ' '
                            salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                            return `roque grande`
                        }
                    }
                }

            }
            //////////
            else if (tabuleiro[lance1] == 'P' && lance1[0] != lance2[0] && tabuleiro[lance2] == ' ') {
                //
                console.log('teste an passant');
                let a = lance2[0]
                let b = parseInt(lance2[1])
                if (salas[numero].turno == 'brancas') {
                    b--
                } else {
                    b++
                }
                let c = `${a}${b}`
                console.log(c);
                console.log(">"+tabuleiro[lance2]+"<  >"+tabuleiro[c]+"<");
                if (tabuleiro[lance2] = ' ' && tabuleiro[c] == "P") {
                    //
                    let move = `${lance1[0]}x${lance2}`
                    let retorno = salas[numero].partida.move(move)
                    if (retorno != null) {
                        //
                        salas[numero].tabuleiro[lance2] = salas[numero].tabuleiro[lance1]
                        salas[numero].tabuleiro[lance1] = ' '
                        salas[numero].tabuleiro[c] = ' '
                        salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                        return `passagem ${lance1} ${lance2} ${c}`
                    }
                }
            }
            //////
            if (true) {
                //
                if (tabuleiro[lance1]=='P') {
                    //
                    console.log('lance de peao');
                    if (lance1[0] != lance2[0]) {
                        if (tabuleiro[lance2] == ' ') {
                            return false
                        } else {
                            //
                            if (lance2[1] == 8 || lance2[1] == 1) {
                                //promocao
                                let move = `${lance1[0]}x${lance2}=Q`
                                let retorno = salas[numero].partida.move(move)
                                if (retorno != null) {
                                    //
                                    console.log(salas[numero].partida.ascii());
                                    salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                                    salas[numero].tabuleiro[lance2] = 'Q'
                                    salas[numero].tabuleiro[lance1] = ' '
                                    return `promocao ${lance1} ${lance2}`
                                }
                            } else {
                                //
                                let move = `${lance1[0]}x${lance2}`
                                let retorno = salas[numero].partida.move(move)
                                if (retorno != null) {
                                    //
                                    console.log(salas[numero].partida.ascii());
                                    salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                                    salas[numero].tabuleiro[lance2] = salas[numero].tabuleiro[lance1]
                                    salas[numero].tabuleiro[lance1] = ' '
                                    return true
                                }
                            }

                            return false
                        }
                    } else {
                        //
                        if (lance2[1] == 8 || lance2[1] == 1) {
                            let move = `${lance2}=Q`
                            let retorno = salas[numero].partida.move(move)
                            if (retorno != null) {
                                //
                                console.log(salas[numero].partida.ascii());
                                salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                                salas[numero].tabuleiro[lance2] = 'Q'
                                salas[numero].tabuleiro[lance1] = ' '
                                return `promocao ${lance1} ${lance2}`
                            }
                        }
                        let move = `${lance2}`
                        let retorno = salas[numero].partida.move(move)
                        if (retorno != null) {
                            //
                            console.log(salas[numero].partida.ascii());
                            salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                            salas[numero].tabuleiro[lance2] = salas[numero].tabuleiro[lance1]
                            salas[numero].tabuleiro[lance1] = ' '
                            return true
                        }
                        return false
                    }
                    //
                    console.log('cancelou aqui ');
                    return false
                }
                //
                let retorno = salas[numero].partida.move({color: `${salas[numero].turno == 'brancas' ? 'w' : 'b'}`, from: `${lance1}`, to: lance2})
                if (retorno != null) {
                    //
                    console.log(salas[numero].partida.ascii());
                    salas[numero].turno = `${salas[numero].turno == 'brancas' ? 'pretas' : 'brancas'}`
                    salas[numero].tabuleiro[lance2] = salas[numero].tabuleiro[lance1]
                    salas[numero].tabuleiro[lance1] = ' '
                    return true
                }
                //
                /////////
                console.log('lance invalido. retornando false.');
                return false
            }
            return false
        }
    }

}
///

////////////////////////////////
server.listen(port, err => {
    if (err) {
        console.log('erro: ' + err)
    } else {
        console.log('server rodando em: http://0.0.0.0:'+ port)
    }
})
///////////////////////////////
