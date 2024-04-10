const Prisma = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = new Prisma.PrismaClient()

module.exports = {
    async signup(req, res) {
        try {
            const { email, password, name } = req.body
            if (!email || !password || !name)
                return res.status(400).send('missing params')

            const existed = await prisma.users.findFirst({
                where: {
                    email,
                },
            })
            if (existed) return res.status(409).send('email have been used')

            const hashedPassword = await bcrypt.hash(password, 8)
            await prisma.users.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            })

            res.status(201).send('created user')
        } catch (err) {
            console.error(err.message)
            res.status(401).send(err.message)
        }
    },
    async login(req, res) {
        const { email, password } = req.body

        const user = await prisma.users.findFirst({
            where: {
                email,
            },
        })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('wrong email or password')
        }

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        })

        res.status(200).json({
            id: user.id,
            name: user.name,
            token,
        })
    },
}
