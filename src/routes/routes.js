import express from 'express'
import Controller from '../middlewares/Controller.js'
import { verificarJWT,gerarToken } from '../middlewares/Auth.js'

export const router = express.Router()

router.get('/token', (req,res)=>{
  const origin = req.get('referer')
  console.log(origin)
  
  const token = gerarToken({ip: req.ip})

  res.json({token:token})
})

router.put('/inserir', verificarJWT, async (req, res, next)=>{
  try{
    const result = await Controller.salvarQuantidade(req)
    res.send(result)
  }catch(err){
    next(err)
  }
})

router.get('/numeros', async (req, res, next) => {
  try{
    const result = await Controller.verQuantidade()
    res.send(result)
  }catch(err){
    next(err)
  }
})


