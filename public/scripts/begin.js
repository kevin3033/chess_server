begin()
function begin() {
    let table = document.querySelector(".table")
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    table.innerHTML += `<div id="casa" class="casabranco"></div>`

                } else {
                    table.innerHTML += `<div id="casa" class="casapreto"></div>`

                }
            } else {
                if (j % 2 === 0) {
                    table.innerHTML += `<div id="casa" class="casapreto"></div>`

                } else {
                    table.innerHTML += `<div id="casa" class="casabranco"></div>`

                }
            }
        }
    }
    let casas = 'a8 b8 c8 d8 e8 f8 g8 h8 a7 b7 c7 d7 e7 f7 g7 h7 a6 b6 c6 d6 e6 f6 g6 h6 a5 b5 c5 d5 e5 f5 g5 h5 a4 b4 c4 d4 e4 f4 g4 h4 a3 b3 c3 d3 e3 f3 g3 h3 a2 b2 c2 d2 e2 f2 g2 h2 a1 b1 c1 d1 e1 f1 g1 h1'
    let casasse = casas.split(' ')
    let nomes = 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR'
    for (var i = 0; i < 64; i++) {
        let a = `<div id='${casasse[i]}' class="${nomes[i] === ' ' ? 'sempeca' : `${i > 47 ? "pecaminha" : "peca"}`}">${nomes[i]}</div>`
        table.childNodes[i].innerHTML = a
    }

}
