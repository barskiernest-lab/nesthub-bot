const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'NestHub.aternos.me', // Твой IP сервера
        port: 53251,                // Твой порт
        username: 'NestHub_Guard',  // Тот самый ник из Шага 1
        version: '1.21.4'           // Твоя версия
    })

    bot.on('spawn', () => {
        console.log('Бот успешно зашел на NestHub и держит онлайн!')
        // Бот автоматически отправляет команды входа на случай проверок
        bot.chat('/register GuardPassword123 GuardPassword123')
        bot.chat('/login GuardPassword123')
    })

    // Анти-АФК: Бот подпрыгивает каждые 15 секунд, чтобы Атернос не кикнул его за простой
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }
    }, 15000)

    // Если Атернос перезагрузится, бот сам зайдет обратно через 10 секунд!
    bot.on('end', () => {
        console.log('Потеря соединения. Переподключение через 10 секунд...')
        setTimeout(createBot, 10000)
    })
}

createBot()
