//Создаем HTTP - сервер
const server = require('http').createServer()

//Подключаем к серверу Socket.io
//require('socket.io')(server, ... создает новый экземпляр socket.io, подключенный к http-серверу
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})
const log = console.log

//Подключаем обработчики событий
const registerMessageHandlers = require('./handlers/messageHandlers')
const registerUserHandlers = require('./handlers/userHandlers')

//Данная функция будет выполнятся при подключении каждого сокета
const onConnection = (socket) => {
  log('User connected')

  //Получаем название комнаты из строки запроса "рукопожатия"
  const { roomId } = socket.handshake.query
  //Сохраняем название комнаты в соответствующем свойстве сокета
  socket.roomId = roomId

  //Присоединяемся к комнате
  socket.join(roomId)

  //Регистрируем обработчики
  registerMessageHandlers(io, socket)
  registerUserHandlers(io, socket)

  //Обрабатываем отключение сокета-пользователя
  socket.on('disconnect', () => {
    log('User disconnected')
    //Покидаем комнату
    socket.leave(roomId)
  })
}

//Обрабатываем подключение
//Обработчик событий io.on обрабатывает события подключения, отключения и т.д.
//на событие connection мы устанавливаем функцию обработчик, которая принимает объект сокета
io.on('connection', onConnection)

//Запускаем сервер
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server ready. Port: ${PORT}`)
})
