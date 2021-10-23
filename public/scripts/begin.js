begin()
function begin() {
    console.log('begin');
    let table = document.querySelector(".table")
    console.log(table)
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    table.innerHTML += `<div id="casa" class="casabranco"></div>`
                    console.log('casabranco')
                } else {
                    table.innerHTML += `<div id="casa" class="casapreto"></div>`
                    console.log('casapreto')
                }
            } else {
                if (j % 2 === 0) {
                    table.innerHTML += `<div id="casa" class="casapreto"></div>`
                    console.log('casapreto')
                } else {
                    table.innerHTML += `<div id="casa" class="casabranco"></div>`
                    console.log('casabranco')
                }
            }
        }
    }
    let nomes = 'RNBQKBNRPPPPPPPP                                PPPPPPPPRNBQKBNR'
    for (var i = 0; i < 64; i++) {
        let a = `<div class="${nomes[i] === ' ' ? 'sempeca' : `${i > 47 ? "pecaminha" : "peca"}`}">${nomes[i]}</div>`
        table.childNodes[i].innerHTML = a
    }

}
