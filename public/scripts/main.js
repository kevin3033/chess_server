///
const socket = io()
///pegando nome e descricao e sala da
let nome_e_descricao = window.location.search.replace('?', '').replace('&', ' ').replace('&', ' ').split(' ')
let nome = nome_e_descricao[0].replace('nome=', '')
let descricao = nome_e_descricao[1].replace('descricao=', '')
let sala = nome_e_descricao[2].replace('sala=', '')

console.log(nome_e_descricao);
//coloca na tela seus nomes
document.querySelector('.barrabranca').innerHTML = nome + ' - ' + descricao
///
let table = document.querySelector(".table")
let cor = ''
///////////////////////////////////////////////////////////////////////
// diz pro server a sala
socket.emit('joinsala', {nome: nome, descricao: descricao, sala: sala})
//
//inicio - server te poe na sala
socket.on('start', data => {
    //
    if (data.cor == 'brancas') {
        //
        cor = 'brancas'
        document.querySelector('.barrapreta').innerHTML = 'aguardando oponente...'
        //
        //aguardar oponente
        socket.on('oponente', data => {
            document.querySelector('.barrapreta').innerHTML = data.nome + ' - ' + (data.descricao == null ? 'nada' : data.descricao)
        })
        //
        //
    } else if (data.cor == 'pretas'){
        //
        cor = 'pretas'
        document.querySelector('.barrapreta').innerHTML = 'aguardando oponente...'
        //
        //pegar as informacoes das brancas
        socket.on('brancas', data => {
            document.querySelector('.barrapreta').innerHTML = data.nome + ' - ' + (data.descricao == null ? 'nada' : data.descricao)
        })
        //
        /////////////////////////////////////////
        //arrumar o tabuleiro das negras
        document.querySelector('.barrapreta').style.backgroundColor = 'white'
        document.querySelector('.barrabranca').style.backgroundColor = 'gray'
        document.querySelector('.barrapreta').innerHTML = data.nome + ' - ' + (data.descricao == null ? 'nada' : data.descricao)
        let casas = 'a1 b1 c1 d1 e1 f1 g1 h1 a2 b2 c2 d2 e2 f2 g2 h2 a3 b3 c3 d3 e3 f3 g3 h3 a4 b4 c4 d4 e4 f4 g4 h4 a5 b5 c5 d5 e5 f5 g5 h5 a6 b6 c6 d6 e6 f6 g6 h6 a7 b7 c7 d7 e7 f7 g7 h7 a8 b8 c8 d8 e8 f8 g8 h8'
        let casasse = casas.split(' ')
        let nomes = 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR'
        for (var i = 0; i < 64; i++) {
            let a = `<div id='${casasse[i]}' class="${nomes[i] === ' ' ? 'sempeca' : `${i > 47 ? "pecaminha" : "peca"}`}">${nomes[i]}</div>`
            table.childNodes[i].innerHTML = a
        }
        ////////////////////////////////////////
        //
    } else {
        cor = 'expect'
        document.querySelector('.barrapreta').innerHTML = data.player2.nome + ' - ' + (data.player2.descricao== null ? 'nada' : data.player2.descricao)
        document.querySelector('.barrabranca').innerHTML = data.player1.nome + ' - ' + (data.player1.descricao== null ? 'nada' : data.player1.descricao)
        let casas = 'a8 b8 c8 d8 e8 f8 g8 h8 a7 b7 c7 d7 e7 f7 g7 h7 a6 b6 c6 d6 e6 f6 g6 h6 a5 b5 c5 d5 e5 f5 g5 h5 a4 b4 c4 d4 e4 f4 g4 h4 a3 b3 c3 d3 e3 f3 g3 h3 a2 b2 c2 d2 e2 f2 g2 h2 a1 b1 c1 d1 e1 f1 g1 h1'
        let casasse = casas.split(' ')
        let nomes = 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR'
        for (var i = 0; i < 64; i++) {
            let a = `<div id='${casasse[i]}' class="${nomes[i] === ' ' ? 'sempeca' : `${i > 47 ? "peca" : "peca"}`}">${nomes[i]}</div>`
            table.childNodes[i].innerHTML = a
        }

    }
    //
    //
})
//

/////////////////////////////////////////////////////////////////////
//escuta os resets
socket.on('reset', data => {
    if (cor != 'expect') {
        //
        document.querySelector('.barrapreta').innerHTML = 'aguardando oponente...'
        if (cor =='brancas') {
            let casas = 'a8 b8 c8 d8 e8 f8 g8 h8 a7 b7 c7 d7 e7 f7 g7 h7 a6 b6 c6 d6 e6 f6 g6 h6 a5 b5 c5 d5 e5 f5 g5 h5 a4 b4 c4 d4 e4 f4 g4 h4 a3 b3 c3 d3 e3 f3 g3 h3 a2 b2 c2 d2 e2 f2 g2 h2 a1 b1 c1 d1 e1 f1 g1 h1'
            let casasse = casas.split(' ')
            let nomes = 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR'
            for (var i = 0; i < 64; i++) {
                let a = `<div id='${casasse[i]}' class="${nomes[i] === ' ' ? 'sempeca' : `${i > 47 ? "pecaminha" : "peca"}`}">${nomes[i]}</div>`
                table.childNodes[i].innerHTML = a
            }
        } else {
            document.querySelector('.barrapreta').style.backgroundColor = 'white'
            document.querySelector('.barrabranca').style.backgroundColor = 'gray'
            document.querySelector('.barrapreta').innerHTML = 'aguardando oponente...'
            let casas = 'a1 b1 c1 d1 e1 f1 g1 h1 a2 b2 c2 d2 e2 f2 g2 h2 a3 b3 c3 d3 e3 f3 g3 h3 a4 b4 c4 d4 e4 f4 g4 h4 a5 b5 c5 d5 e5 f5 g5 h5 a6 b6 c6 d6 e6 f6 g6 h6 a7 b7 c7 d7 e7 f7 g7 h7 a8 b8 c8 d8 e8 f8 g8 h8'
            let casasse = casas.split(' ')
            let nomes = 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR'
            for (var i = 0; i < 64; i++) {
                let a = `<div id='${casasse[i]}' class="${nomes[i] === ' ' ? 'sempeca' : `${i > 47 ? "pecaminha" : "peca"}`}">${nomes[i]}</div>`
                table.childNodes[i].innerHTML = a
            }
        }
        //
    } else {
        console.log('nada por aqui, a sala vai ser resetada.');
    }

})
/////////
socket.on('resetparaexpect', data => {
    if (cor == 'expect') {
        document.querySelector('.barrapreta').innerHTML = (data.player2.nome == null ? 'ninguém' : data.player2.nome) + ' - ' + (data.player2.descricao = null ? 'nada':data.player2.descricao)
        document.querySelector('.barrabranca').innerHTML = (data.player1.nome == null ? 'ninguém' : data.player1.nome) + ' - ' + (data.player1.descricao = null ? 'nada':data.player1.descricao)
        let casas = 'a8 b8 c8 d8 e8 f8 g8 h8 a7 b7 c7 d7 e7 f7 g7 h7 a6 b6 c6 d6 e6 f6 g6 h6 a5 b5 c5 d5 e5 f5 g5 h5 a4 b4 c4 d4 e4 f4 g4 h4 a3 b3 c3 d3 e3 f3 g3 h3 a2 b2 c2 d2 e2 f2 g2 h2 a1 b1 c1 d1 e1 f1 g1 h1'
        let casasse = casas.split(' ')
        let nomes = 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR'
        for (var i = 0; i < 64; i++) {
            let a = `<div id='${casasse[i]}' class="${nomes[i] === ' ' ? 'sempeca' : `${i > 47 ? "peca" : "peca"}`}">${nomes[i]}</div>`
            table.childNodes[i].innerHTML = a
        }

    }
})
////////////////////////////////////////////////////
//escuta o movimento da sala/////////////////////
socket.on('movimento', data => {
    console.log('movimento');
    if (data) {
        mudar_tabuleiro(data.cor, data.c1, data.c2)
    }
})
socket.on('passagem', data => {
    console.log('passagem');
    if (data) {
        mudar_tabuleiropassagem(data.cor, data.c1, data.c2, data.c3)
    }
})
socket.on('roque', data => {
    console.log('roque');
    if (data) {
        mudar_tabuleiroroque(data.cor, data.qual)
    }
})
socket.on('promocao', data => {
    console.log('promocao');
    if (data) {
        mudar_tabuleiropromocao(data.cor, data.c1, data.c2)
    }
})
//////////////////////////////////////////////
////////////////////////////////////////////////

//////////////////////////////
/////funcoes que alteram o front end/////////////////
function mudar_tabuleiroroque(corr, qual) {
    if (cor == 'expect') {
        if (corr == 'brancas' && qual == 'curto') {
            document.querySelector(`#g1`).innerHTML = document.querySelector(`#e1`).innerHTML
            document.querySelector(`#g1`).className = 'peca'

            document.querySelector('#f1').innerHTML = document.querySelector(`#h1`).innerHTML
            document.querySelector(`#f1`).className = 'peca'
            /////////limpar
            document.querySelector(`#e1`).innerHTML = ' '
            document.querySelector(`#e1`).className = 'sempeca'
            document.querySelector(`#h1`).innerHTML = ' '
            document.querySelector(`#h1`).className = 'sempeca'
            ////////////
        } else if (corr == 'brancas' && qual == 'grande') {
            document.querySelector(`#c1`).innerHTML = document.querySelector(`#e1`).innerHTML
            document.querySelector(`#c1`).className = 'peca'

            document.querySelector('#d1').innerHTML = document.querySelector(`#a1`).innerHTML
            document.querySelector(`#d1`).className = 'peca'
            /////////limpar
            document.querySelector(`#e1`).innerHTML = ' '
            document.querySelector(`#e1`).className = 'sempeca'
            document.querySelector(`#a1`).innerHTML = ' '
            document.querySelector(`#a1`).className = 'sempeca'
            document.querySelector(`#b1`).innerHTML = ' '
            document.querySelector(`#b1`).className = 'sempeca'
            ////////////
        } else if (corr == 'pretas' && qual == 'curto') {
            document.querySelector(`#g8`).innerHTML = document.querySelector(`#e8`).innerHTML
            document.querySelector(`#g8`).className = 'peca'

            document.querySelector('#f8').innerHTML = document.querySelector(`#h8`).innerHTML
            document.querySelector(`#f8`).className = 'peca'
            /////////limpar
            document.querySelector(`#e8`).innerHTML = ' '
            document.querySelector(`#e8`).className = 'sempeca'
            document.querySelector(`#h8`).innerHTML = ' '
            document.querySelector(`#h8`).className = 'sempeca'
            ////////////
        } else if (corr == 'pretas' && qual == 'grande') {
            document.querySelector(`#c8`).innerHTML = document.querySelector(`#e8`).innerHTML
            document.querySelector(`#c8`).className = 'peca'

            document.querySelector('#d8').innerHTML = document.querySelector(`#a8`).innerHTML
            document.querySelector(`#d8`).className = 'peca'
            /////////limpar
            document.querySelector(`#e8`).innerHTML = ' '
            document.querySelector(`#e8`).className = 'sempeca'
            document.querySelector(`#a8`).innerHTML = ' '
            document.querySelector(`#a8`).className = 'sempeca'
            document.querySelector(`#b8`).innerHTML = ' '
            document.querySelector(`#b8`).className = 'sempeca'
            ////////////
        }
        return
    }
    if (corr == cor) {
        if (corr == 'brancas' && qual == 'curto') {
            document.querySelector(`#g1`).innerHTML = document.querySelector(`#e1`).innerHTML
            document.querySelector(`#g1`).className = 'pecaminha'

            document.querySelector('#f1').innerHTML = document.querySelector(`#h1`).innerHTML
            document.querySelector(`#f1`).className = 'pecaminha'
            /////////limpar
            document.querySelector(`#e1`).innerHTML = ' '
            document.querySelector(`#e1`).className = 'sempeca'
            document.querySelector(`#h1`).innerHTML = ' '
            document.querySelector(`#h1`).className = 'sempeca'
            ////////////
        } else if (corr == 'brancas' && qual == 'grande') {
            document.querySelector(`#c1`).innerHTML = document.querySelector(`#e1`).innerHTML
            document.querySelector(`#c1`).className = 'pecaminha'

            document.querySelector('#d1').innerHTML = document.querySelector(`#a1`).innerHTML
            document.querySelector(`#d1`).className = 'pecaminha'
            /////////limpar
            document.querySelector(`#e1`).innerHTML = ' '
            document.querySelector(`#e1`).className = 'sempeca'
            document.querySelector(`#a1`).innerHTML = ' '
            document.querySelector(`#a1`).className = 'sempeca'
            document.querySelector(`#b1`).innerHTML = ' '
            document.querySelector(`#b1`).className = 'sempeca'
            ////////////
        } else if (corr == 'pretas' && qual == 'curto') {
            document.querySelector(`#g8`).innerHTML = document.querySelector(`#e8`).innerHTML
            document.querySelector(`#g8`).className = 'peca'

            document.querySelector('#f8').innerHTML = document.querySelector(`#h8`).innerHTML
            document.querySelector(`#f8`).className = 'peca'
            /////////limpar
            document.querySelector(`#e8`).innerHTML = ' '
            document.querySelector(`#e8`).className = 'sempeca'
            document.querySelector(`#h8`).innerHTML = ' '
            document.querySelector(`#h8`).className = 'sempeca'
            ////////////
        } else if (corr == 'pretas' && qual == 'grande') {
            document.querySelector(`#c8`).innerHTML = document.querySelector(`#e8`).innerHTML
            document.querySelector(`#c8`).className = 'peca'

            document.querySelector('#d8').innerHTML = document.querySelector(`#a8`).innerHTML
            document.querySelector(`#d8`).className = 'peca'
            /////////limpar
            document.querySelector(`#e8`).innerHTML = ' '
            document.querySelector(`#e8`).className = 'sempeca'
            document.querySelector(`#a8`).innerHTML = ' '
            document.querySelector(`#a8`).className = 'sempeca'
            document.querySelector(`#b8`).innerHTML = ' '
            document.querySelector(`#b8`).className = 'sempeca'
            ////////////
        }
    } else {
    ///////////////
        if (corr == 'brancas' && qual == 'curto') {
            document.querySelector(`#g1`).innerHTML = document.querySelector(`#e1`).innerHTML
            document.querySelector(`#g1`).className = 'peca'

            document.querySelector('#f1').innerHTML = document.querySelector(`#h1`).innerHTML
            document.querySelector(`#f1`).className = 'peca'
            /////////limpar
            document.querySelector(`#e1`).innerHTML = ' '
            document.querySelector(`#e1`).className = 'sempeca'
            document.querySelector(`#h1`).innerHTML = ' '
            document.querySelector(`#h1`).className = 'sempeca'
            ////////////
        } else if (corr == 'brancas' && qual == 'grande') {
            document.querySelector(`#c1`).innerHTML = document.querySelector(`#e1`).innerHTML
            document.querySelector(`#c1`).className = 'peca'

            document.querySelector('#d1').innerHTML = document.querySelector(`#a1`).innerHTML
            document.querySelector(`#d1`).className = 'peca'
            /////////limpar
            document.querySelector(`#e1`).innerHTML = ' '
            document.querySelector(`#e1`).className = 'sempeca'
            document.querySelector(`#a1`).innerHTML = ' '
            document.querySelector(`#a1`).className = 'sempeca'
            document.querySelector(`#b1`).innerHTML = ' '
            document.querySelector(`#b1`).className = 'sempeca'
            ////////////
        } else if (corr == 'pretas' && qual == 'curto') {
            document.querySelector(`#g8`).innerHTML = document.querySelector(`#e8`).innerHTML
            document.querySelector(`#g8`).className = 'pecaminha'

            document.querySelector('#f8').innerHTML = document.querySelector(`#h8`).innerHTML
            document.querySelector(`#f8`).className = 'pecaminha'
            /////////limpar
            document.querySelector(`#e8`).innerHTML = ' '
            document.querySelector(`#e8`).className = 'sempeca'
            document.querySelector(`#h8`).innerHTML = ' '
            document.querySelector(`#h8`).className = 'sempeca'
            ////////////
        } else if (corr == 'pretas' && qual == 'grande') {
            document.querySelector(`#c8`).innerHTML = document.querySelector(`#e8`).innerHTML
            document.querySelector(`#c8`).className = 'pecaminha'

            document.querySelector('#d8').innerHTML = document.querySelector(`#a8`).innerHTML
            document.querySelector(`#d8`).className = 'pecaminha'
            /////////limpar
            document.querySelector(`#e8`).innerHTML = ' '
            document.querySelector(`#e8`).className = 'sempeca'
            document.querySelector(`#a8`).innerHTML = ' '
            document.querySelector(`#a8`).className = 'sempeca'
            document.querySelector(`#b8`).innerHTML = ' '
            document.querySelector(`#b8`).className = 'sempeca'
            ////////////
        }
    }
}
function mudar_tabuleiro(corr, c1, c2) {
    if (cor == 'expect') {
        document.querySelector(`#${c2}`).innerHTML = document.querySelector(`#${c1}`).innerHTML
        document.querySelector(`#${c1}`).innerHTML = ' '
        document.querySelector(`#${c2}`).className = 'peca'
        document.querySelector(`#${c1}`).className = 'sempeca'
        return
    }
    if (cor == corr) {
        document.querySelector(`#${c2}`).innerHTML = document.querySelector(`#${c1}`).innerHTML
        document.querySelector(`#${c1}`).innerHTML = ' '
        document.querySelector(`#${c2}`).className = 'pecaminha'
        document.querySelector(`#${c1}`).className = 'sempeca'
        return
    }
    document.querySelector(`#${c2}`).innerHTML = document.querySelector(`#${c1}`).innerHTML
    document.querySelector(`#${c1}`).innerHTML = ' '
    document.querySelector(`#${c2}`).className = 'peca'
    document.querySelector(`#${c1}`).className = 'sempeca'

}
function mudar_tabuleiropassagem(corr, c1, c2, c3) {
    if (cor ==' expect') {
        document.querySelector(`#${c2}`).innerHTML = document.querySelector(`#${c1}`).innerHTML
        document.querySelector(`#${c1}`).innerHTML = ' '
        document.querySelector(`#${c2}`).className = 'peca'
        document.querySelector(`#${c1}`).className = 'sempeca'
        document.querySelector(`#${c3}`).innerHTML = ' '
        document.querySelector(`#${c3}`).className = 'sempeca'
        return
    }
    if (cor == corr) {
        document.querySelector(`#${c2}`).innerHTML = document.querySelector(`#${c1}`).innerHTML
        document.querySelector(`#${c1}`).innerHTML = ' '
        document.querySelector(`#${c2}`).className = 'pecaminha'
        document.querySelector(`#${c1}`).className = 'sempeca'
        document.querySelector(`#${c3}`).innerHTML = ' '
        document.querySelector(`#${c3}`).className = 'sempeca'
        return
    }
    document.querySelector(`#${c2}`).innerHTML = document.querySelector(`#${c1}`).innerHTML
    document.querySelector(`#${c1}`).innerHTML = ' '
    document.querySelector(`#${c2}`).className = 'peca'
    document.querySelector(`#${c1}`).className = 'sempeca'
    document.querySelector(`#${c3}`).innerHTML = ' '
    document.querySelector(`#${c3}`).className = 'sempeca'
}
function mudar_tabuleiropromocao(corr, c1, c2) {
    if (cor == 'expect') {
        document.querySelector(`#${c2}`).innerHTML = 'Q'
        document.querySelector(`#${c1}`).innerHTML = ' '
        document.querySelector(`#${c2}`).className = 'peca'
        document.querySelector(`#${c1}`).className = 'sempeca'
        return
    }
    if (cor == corr) {
        document.querySelector(`#${c2}`).innerHTML = 'Q'
        document.querySelector(`#${c1}`).innerHTML = ' '
        document.querySelector(`#${c2}`).className = 'pecaminha'
        document.querySelector(`#${c1}`).className = 'sempeca'
        return
    }
    document.querySelector(`#${c2}`).innerHTML = 'q'
    document.querySelector(`#${c1}`).innerHTML = ' '
    document.querySelector(`#${c2}`).className = 'peca'
    document.querySelector(`#${c1}`).className = 'sempeca'
}
////////////////////////////////////////////
//////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////
//função que faz um request pro server com o lance
function validar(c1, c2, cor){
    //
    socket.emit('lance', {de:c1,para:c2,cor:cor,sala:sala})
    //
    console.log('enviou: '+ {de:c1,para:c2,cor:cor,sala:sala});
    //
}

////////////////////////////////////////////////////////////////////////////
//verifica os cliques no tabuleiro
//
let clicks = 0
let de = ''
let para = ''
////
//
document.querySelector('.table').addEventListener('click', e => {
    console.log('clicou pela: '+clicks);

    ///
    if (document.querySelector('.barrapreta').innerHTML == 'aguardando oponente...') {
        return

    }
    ///

    ///
    if (clicks == 0) {
        //
        if (e.target.id == 'casa') {
            //
            if (e.target.childNodes[0].className != 'pecaminha') {
                return
            }
            //
            de = e.target.childNodes[0].id
            console.log(de);
            click++
        } else {
            //
            if (e.target.className != 'pecaminha') {
                return
            }
            //
            de = e.target.id
            clicks++
        }
    } else if(clicks == 1) {
        //
        if (e.target.id == 'casa') {
            //
            para = e.target.childNodes[0].id
        } else {
            //
            para = e.target.id
        }
        ///////////
        //chama a função que envia um request pro server
        //
        validar(de, para, cor)
        //
        clicks = 0
        de = ''
        para = ''
        ///
    }

})
