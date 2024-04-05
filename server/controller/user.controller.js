const Prisma = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = new Prisma.PrismaClient()

module.exports = {
    async signup(req, res) {
        try {
            const {user_id, password, name} = req.body
            if(!user_id || !password || !name) return res.json({succeed: false, message: 'missed signup param'})
            
            const existed = await prisma.users.findFirst({
                where: {
                    user_id
                }
            })
            if(existed) return res.json({succeed: false, message: 'user existed'})

            const hashedPassword = await bcrypt.hash(password, 8)
            await prisma.users.create({
                data: {
                    user_id,
                    password: hashedPassword,
                    name
                }
            })

            res.status(201).json({succeed: true})                                                                              
        } catch(err) {
            console.error(err.message)
            res.status(401).json({succeed: false})
        }
    },
    async login(req, res) {
        const {user_id, password} = req.body

        const user = await prisma.users.findFirst({
            where: {
                user_id
            }
        })

        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.json({succeed: false})
        }

        const token = jwt.sign({user_id: user.user_id}, process.env.SECRET_KEY, {expiresIn: '1h'})

        res.json({token, succeed: true})
    }
}