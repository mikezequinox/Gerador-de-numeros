window.onload = () => {
    let botaoGerar = document.getElementById('botaoGerar'),
        checkboxAddMinMax = document.getElementById('checkboxAddMinMax'),
        checkboxIncluirRepeticao = document.getElementById('checkboxIncluirRepeticao'),
        botaoCopiar = document.getElementById('botaoCopiar')


    checkboxAddMinMax.addEventListener('change', ()=>{
        let div = document.getElementById('subTelaIncluirMinMax')

        if(checkboxAddMinMax.checked)
        {
            div.innerHTML = `<p class='titulo'> valor minimo</p>
                            <input class='inputMinMax' type="number" id="valorMinimo"> 
                            <p class='titulo'> valor maximo</p>
                            <input class='inputMinMax' type="number" id="valorMaximo">`
            div.style.padding = "0.5vw"
            div.style.gap = "0.5vw"
        }else{
            div.innerHTML = ''
            div.style.padding = "0vw"
        }
    })

    checkboxIncluirRepeticao.addEventListener('change',()=>{
        let div = document.getElementById('obs')

        if(checkboxIncluirRepeticao.checked)
        {
            div.innerHTML = ''
            div.style.margin = "0vw"
        } 
        else
            div.innerHTML = '<p id="obs">OBS: A quantidade gerada pode ser menor do que a solicitada, pois os números repetidos são eliminados.</p>'
    })

    botaoGerar.addEventListener('click',()=>{
        let resultado = document.getElementById('resultado'),
            qtd = document.getElementById('quantidade').value,
            min = document.getElementById('valorMinimo')?.value ?? null,
            max = document.getElementById('valorMaximo')?.value ?? null,
            incluirRepeticao = document.getElementById('checkboxIncluirRepeticao').checked,
            incluirDecimal = document.getElementById('checkboxIncluirDecimal').checked

        resultado.textContent = gerarNumeros(qtd,min,max,incluirDecimal,incluirRepeticao)
    })

    botaoCopiar.addEventListener('click', ()=>{
        let texto = document.getElementById("resultado").textContent
        
        navigator.clipboard.writeText(texto)
            .then(() => {
                alert(`O texto foi copiado`)
            })
            .catch(() => {
                alert(`Ocorreu um erro ao copiar o texto, tente novamente`)
            })
    })


    function gerarNumeros(quantidade, min, max, incluirDecimal,IncluirRepeticao)
    {
        var numeros = []
        var range = [10,50,100,500,1000,5000,10000,50000,100000,500000,1000000,
                     5000000,10000000,50000000,100000000,500000000,1000000000]
        
        if(min === '' || min == null) min = -1000000000
        if(max === '' || max == null) max = 1000000000
        if(min > max) [min,max] = [max,min]
        if(quantidade > 1000)
            quantidade = 1000
    
        for(let i=0;i<quantidade;i++)
        {   
            let tentativas = 0
            if(min == max)
            {
                numero = Number(min)
            }else{
                do{
                    var randPosition = Math.floor(Date.now() * Math.random()) % 15
                    var numero = ((Date.now() * (Math.random() - 0.5)) % range[randPosition])

                    tentativas++
                    if(tentativas > 10000) break
                }while((numero < min) || (numero > max))
            }
                
            numeros[i] = numero
        }

        numeros = numeros.map(num => num.toFixed(2))

        if(!incluirDecimal)
            numeros.forEach((num,i)=>{ numeros[i] = Math.floor(num)})

        if(!IncluirRepeticao)
            numeros = removerRepetidos(numeros)

        return numeros
    }

    function removerRepetidos(numeros){
        return [...new Set(numeros)]
    }

}