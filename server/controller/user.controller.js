const Prisma = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifalia = require('verifalia')

const prisma = new Prisma.PrismaClient()

module.exports = {
    async signup(req, res) {
        try {
            const { email, password, name } = req.body
            if (!email || !password || !name)
                return res.json({
                    succeed: false,
                    message: 'missed signup param',
                })

            const existed = await prisma.users.findFirst({
                where: {
                    email,
                },
            })
            if (existed)
                return res.json({ succeed: false, message: 'user existed' })

            const hashedPassword = await bcrypt.hash(password, 8)
            await prisma.users.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            })

            res.status(201).json({ succeed: true })
        } catch (err) {
            console.error(err.message)
            res.status(401).json({ succeed: false })
        }
    },
    async login(req, res) {
        const { email, password } = req.body

        const emailIsValid = await verifalia.submitEmailValidation()

        const user = await prisma.users.findFirst({
            where: {
                email,
            },
        })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.json({ succeed: false })
        }

        const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        )

        res.json({ token, succeed: true })
    },
}
