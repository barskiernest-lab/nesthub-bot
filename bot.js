const mineflayer = require('mineflayer')
const http = require('http')

// Создаем фальшивый веб-сервер для прохождения проверки хостинга
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('NestHub Bot is running!')
})
server.listen(process.env.PORT || 3000, () => {
    console.log('Веб-порт успешно запущен для хостинга!')
})

function createBot() {
    const bot = mineflayer.createBot({
        host: 'NestHub.aternos.me',
        port: 53251,
        username: 'NestHub_Guard',
        version: '1.21.4'
    })

    bot.on('spawn', () => {
        console.log('Бот успешно зашел на NestHub и держит онлайн!')
        bot.chat('/register GuardPassword123 GuardPassword123')
        bot.chat('/login GuardPassword123')
    })

    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }
    }, 15000)

    bot.on('end', () => {
        console.log('Потеря соединения. Переподключение через 10 секунд...')
        setTimeout(createBot, 10000)
    })
}

createBot()
