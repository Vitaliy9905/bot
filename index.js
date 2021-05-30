


// const TelegramBot = require('node-telegram-bot-api');
// const token = '1888005263:AAFGJZAmbowSVcf4XCyhRUXraKXDW4ksej4';
// const bot = new TelegramBot(token, {polling: true});



// bot.on('message', (msg) => {
    
//   var Hi = "hi";
//   if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
//   bot.sendMessage(msg.chat.id,"Hello dear user");
//   } 
  
//   var bye = "bye";
//   if (msg.text.toString().toLowerCase().includes(bye)) {
//     bot.sendMessage(msg.chat.id, "Hope to see you around again, Bye")
//   }

//   // let chatId = msg.chat.id;
//   // bot.sendMessage(chatId, 'Привет, Друг!');
      
//   });
  
// bot.onText(/\/start/, (msg) => {
//   bot.sendMessage(msg.chat.id, "Welcome");
// });

// bot.onText(/\/sendpic/, (msg) => {
//   bot.sendPhoto(msg.chat.id,"https://telecomdom.com/wp-content/uploads/2020/02/krasivye-kartinki-na-telefon-6.jpg",{caption : "Here we go ! \nThis is just a caption "} );
// });

//       // /* код добовляет фото при каждом ответе бота
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendPhoto(chatId, 'image.jpeg');
// });


// const keyboard = [
//   [
//     {
//       text: 'Хочу кота', // Текст на кнопке
//       callback_data: 'moreKeks' // данные для обработчика событий
//     }
//   ],
//   [
//     {
//       text: 'Хочу песика',
//       callback_data: 'morePes'
//     }
//   ],
//   [
//     {
//       text: 'Хоч проходить курсы',
//       url: 'https://htmlacademy.ru/courses' //внешняя ссылка
//     }
//   ]
// ];

// // Оброботчик нажатий на клавиатуру
// bot.on('callback_query', (query) => {
//   const chatId = query.message.chat.id;

//   let img = '';

//   if (query.data === 'moreKeks') {
//     img = 'image.jpeg';
//   }

//   if (query.data === 'morePes') {
//     img = 'cat.jpeg';
//   }

//   if (img) {
//     bot.sendPhoto(chatId, img, {
//       reply_markup: {
//         inline_keyboard: keyboard
//       }
//     });
//   } else {
//     bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {
//       // прикрутим клаву
//       reply_markup: {
//         inline_keyboard: keyboard
//       }
//     });
//   }
// });



const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api
const {gameOptions, againOptions} = require('./options')
const token = '1888005263:AAFGJZAmbowSVcf4XCyhRUXraKXDW4ksej4'; // тут токен который мы получили от botFather

// включаем самого бота
const bot = new TelegramBot(token, { polling: true });

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен её угодать!`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

bot.setMyCommands([
  { command: '/start', description: 'Начальное прведствие' },
  { command: '/info', description: 'Информация' },
  { command: '/game', description: 'Игра угодай цифру' }
]);

bot.on('message', (msg) => {

  var Me = 'me';
  if (msg.text.toString().toLowerCase().indexOf(Me) === 0) {
    bot.sendMessage(msg.chat.id, "<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>", { parse_mode: "HTML" });
  }

  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendSticker(msg.chat.id, 'https://tlgrm.ru/_/stickers/b48/7e2/b487e222-21cd-4741-b567-74b25f44b21a/12.webp');
    bot.sendMessage(msg.from.id, "Hello dear " + msg.from.first_name);
  }

  var Hello = "hello";
  if (msg.text.toString().toLowerCase().indexOf(Hello) === 0) {
    bot.sendMessage(msg.from.id, "Hi bro, your last name is " + msg.from.last_name)
  }

  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again, Bye");
  }

  var robot = "Текущее время";
  if (msg.text.indexOf(robot) === 0) {
    bot.sendMessage(msg.chat.id, "Скоро добавлю)");
  }

});

bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === '/start') {
    return bot.sendMessage(chatId, `Wellcome to my home`);
  }
  if (text === '/info') {
    return bot.sendMessage(chatId, `good bye my friends`);
  }
  if (text === '/game') {
    return startGame(chatId);
  }
  return bot.sendMessage(chatId, 'извени ещё не работает)')

});

bot.on('callback_query', async msg => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  if (data === '/again') {
    return startGame(chatId);
  }
  if (data === chats[chatId]) {
    return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions)
  } else {
    return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
  }
})





/*
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
      "keyboard": [["Создать напоминание", "Проверить напоминания"], ["Удалить"], ["Текущее время"]]
    }
});

bot.onText(/\/sendpic/, (msg) => {
  bot.sendPhoto(msg.chat.id, "https://media-exp1.licdn.com/dms/image/C4E0BAQHK_Jit0LpDdw/company-logo_200_200/0/1519905902140?e=2159024400&v=beta&t=UlAesnAYhzLm-sidHaJ6h7NHwPhUBZLc1a37kkT4QRE" );
});

});
*/

// //  Конфиг клавиатуры 
// const keyboard = [
//   [
//     {
//       text: 'Хочу картинку 1', // текст на кнопке 
//       callback_data: 'moreKeks' // данные для обработчика событий
//     }
//   ],
//   [
//     {
//       text: 'Хочу картину 2',
//       callback_data: 'morePes'
//     }
//   ],
//   [
//     {
//       text: 'Хочу проходить курсы',
//       url: 'https://github.com/hosein2398/node-telegram-bot-api-tutorial#Creating+new+bot+with+BotFather'
//     }
//   ]
// ];

// // обработчик события присылания нам любого сообщения 
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id; // получаем индетификатор диалога, чтобы отвечать именно тому  пользователю,
//   //который нам что-то прислал

//   //отправляем сообщение 
//   bot.sendMessage(chatId, 'Привет, Друг! чего хочешь ?', { //прикрутим клаву
//     reply_markup: {
//       inline_keyboard: keyboard
//     }
//   });
// });

// // обработичик событий нажатий на клавиатуру 
// bot.on('callback_query', (query) => {
//   const chatId = query.message.chat.id;

//   let img = '';

//   if (query.data === 'moreKeks') { // если кот
//     img = '/cat.jpeg';
//   }

//   if (query.data === 'morePes') { // если пёс
//     img = '/image.jpeg';
//   }

//   if (img) {
//     bot.sendPhoto(chaId, img, { // прикрутим клаву
//       reply_markup: {
//         inline_keyboard: keyboard
//       }
//     });
//   } else {
//     bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {
//       reply_markup: {
//         inline_keyboard: keyboard
//       }
//     });
//   }
// });
