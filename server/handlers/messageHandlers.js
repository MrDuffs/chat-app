//Подключаем библиотеку nanoid, котороая позволяет генерировать id
const { nanoid } = require('nanoid')
//Настраиваем локальную БД с помощью lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//БД хранится в директории "db" с названием "messages.json"
const adapter = new FileSync('db/messages.json')
const db = low(adapter)

//Записываем в БД начальные данные
db.defaults({
  messages: [
    {
      messageId: '1',
      userId: '1',
      roomId: 'free',
      senderName: 'Bob',
      messageText: 'What are you doing here?',
      createdAt: '2021-01-14'
    },
    {
      messageId: '2',
      userId: '2',
      roomId: 'free',
      senderName: 'Alice',
      messageText: 'Go back to work!',
      createdAt: '2021-02-15'
    }
  ]
}).write()

module.exports = (io, socket) => {
  //Обрабатываем запрос на получение сообщений
  const getMessages = () => {
    //получаем данные из БД
    const messages = db.get('messages').value()
    //Передаем сообщения пользователям находящимся в определенных комнатах
    io.in(socket.roomId).emit('messages', messages.filter(m => m.roomId === socket.roomId))
  }

  //Обрабатываем добавление сообщения
  //функция принимает на вход объект сообщения
  const addMessage = (message) => {
    db.get('messages')
      .push({
        //генерируем идентификатор с помощью nanoid, длина id - 8
        messageId: nanoid(8),
        roomId: socket.roomId,
        createdAt: new Date(),
        ...message
      })
      .write()
    
    //Выыполняем запрос на получение сообщений
    getMessages()
  }

  //Обрабатываем удаление сообщения
  //функция принимает id сообщения
  const removeMessage = (messageId) => {
    db.get('messages').remove({ messageId }).write()

    getMessages()
  }

  socket.on('message:get', getMessages)
  socket.on('message:add', addMessage)
  socket.on('message:remove', removeMessage)
}
