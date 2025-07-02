import pino from "pino"
import path from 'path'

const logPath = path.resolve('logs/app.log')

const logger = pino({
    bindings: (bindings)=>{
        return {host: bindings.hostname}
    },
    timestamp: pino.stdTimeFunctions.isoTime},
    pino.destination(logPath)
) 

export default logger