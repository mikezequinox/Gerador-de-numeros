import Service from "./Service.js"

class Controller{
    async salvarQuantidade(req){
        const quantidade = req.body.quantidade 

        if(!quantidade)
            return 'Requisição inválida'
        
        return await Service.salvarQuantidade(quantidade)
    }

    async verQuantidade(){
        return await Service.verQuantidade()
    }
}

export default new Controller()