const TelegramApi = require('node-telegram-bot-api')

const options = require('./options')

const token = '5985607367:AAHt8XiwhTsv97O9Gc7Ho-3If13zQ-w0QWc'

const bot = new TelegramApi(token,{polling:true})

const chats = {}



const stikers = {
  goodMorning: 'CAACAgIAAxkBAAIB6mOQliOnCbOiJWi-CMy28e-4_FScAAIsAAOFO-IiYp31T5tFXIcrBA',
  sweetSmile:'CAACAgIAAxkBAAM4Y49wbJuqpqL92on7uMINPiWXOV8AAlMNAAI2KslID-tZ_Rpx-aYrBA',
  shyness:'CAACAgIAAxkBAANgY492x92Y8tMrJ4qQJBimA4SBhXUAAo8LAAItRAhJMgM-HDHUO7ArBA',
}

bot.setMyCommands([
    {command:'/start',description:"Приветсвие"},
    {command:'/game', description:"Игра отгадай число"},
    {command:'/help', description:"Тех поддержка"},
])


const playAgain = async (chatId) => {
    await bot.sendMessage(chatId, "Сейчас я загадаю  число от 0 до 9")
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    return bot.sendMessage(chatId, "Отгадай",gameOptions)
}

const start = () => {
    bot.on("message",async msg => {
        const text = msg.text
        const chatId = msg.chat.id
         console.log(msg)
        //if(chatId === 2138951461 || msg.chat.username === 'kdndjsl'){
        //  await  bot.sendMessage(chatId,`Лера крутая`)
        //}
        if(chatId === 1248611971 || msg.chat.username === 'Ha6sis'){
          await  bot.sendMessage(chatId,`Натся какашка`)
        }

        if(text === '/start'){
            await bot.sendSticker(chatId,stikers.sweetSmile)
            return bot.sendMessage(chatId, `Привет ${msg.from.first_name}`) 
        }

        if(text === "/game"){
          return  playAgain(chatId)
        }
          
        if(text === "/help"){
         return bot.sendMessage(chatId, "Если у вас возникли проблемы обратитесь к @I_ne_rei")
      }
        await   bot.sendMessage(chatId, `Извини, я тебя не понимаю`) 
        return bot.sendSticker(chatId, stikers.shyness)
    })


    bot.on('callback_query', async msg  => {
      const chatId = msg.message.chat.id
      const data = msg.data
       
      if(data == '/again'){
       return playAgain(chatId)
      }

      await bot.sendMessage(chatId , `Ты выбрал ${data}`)

      if(chats[chatId] == data){
        await bot.sendMessage(chatId, `Это правильный ответ ${'\uD83C\uDF89'} `, options.gameOptions)
        return bot.sendSticker(chatId, 'CAACAgIAAxkBAAPoY4-GBwhs74ROdvid6tRQHHp5ItoAAq4NAALWa5FItmf-NxoLZNArBA')
      }

     return bot.sendMessage(chatId, `Это неправильний овет, бот загадал цифру ${chats[chatId]}`, options.againOptions)
    })
}

start()
