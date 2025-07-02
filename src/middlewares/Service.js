import { db } from "../db/connection.js"

class Service{
    async salvarQuantidade(quantidade){
        const query = 'UPDATE numeros_gerados SET quantidade = quantidade + ?'

        return new Promise((resolve,reject)=>{
            db.query(query, [quantidade], (err, result) => {
                if(err){
                    reject('Valor não inserido no banco. erro:' + err.message)
                }
                if(result){
                    if(result.affectedRows > 0)
                        resolve('Nova quantidade de numeros gerados atualizada.')
                    else
                        reject('Nova quantidade de numeros gerados não atualizada.') 
                }else{
                    reject('Nova quantidade de numeros gerados não atualizada.') 
                }
                    
            })
        })
    }

    async verQuantidade(){
        const query = 'SELECT * FROM numeros_gerados'

        return new Promise((resolve,reject)=>{
            db.query(query, (err, result) => {
                if(err){
                    console.error('Erro ao buscar dados:', err.message)
                    reject('Erro ao buscar dados.') 
                }
                resolve(result[0]) 
            })
        })
    }
}

export default new Service()