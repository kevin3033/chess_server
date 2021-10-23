const socket = io()
let nomedes = window.location.search.replace('?', '').replace('&', ' ').split(' ')
let nome = nomedes[0].replace('nome=', '')
let descricao = nomedes[1].replace('descricao=', '')
document.querySelector('.barrabranca').innerHTML = nome + ' - ' + descricao

socket.on('sala', data => {
    if (data == 'nova') {
        socket.emit('novasala', {nome: nome, descricao: descricao, cor: 'brancas'})
        document.querySelector('.barrapreta').innerHTML = 'aguardando oponente...'
        socket.on('adversario', data => {
            document.querySelector('.barrapreta').innerHTML = data.nome + ' - ' + data.descricao
            ///partida
        })
    } else {
        socket.emit('dados', {nome: nome, descricao: descricao})
        socket.on('adversario', data => {
            console.log(data);
            document.querySelector('.barrapreta').innerHTML = data.nome + ' - ' + data.descricao
            ///partida
        })
    }
})
