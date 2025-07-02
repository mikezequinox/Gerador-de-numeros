import { MemoryStore, rateLimit } from 'express-rate-limit'

export default rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 10,
	statusCode:429,
	message:'muitas requisições',
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	passOnStoreError: false
})
