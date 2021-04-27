//записываем пользователей как массив объектов пользователей 
const users = []

module.exports = (io, socket) => {
  //Обрабатываем запрос на получение пользователей
  const getUsers = (roomId) => {
    io.in(socket.roomId).emit('users', users.filter(u => u.roomId === socket.roomId))
  }

  //Обрабатываем добавление пользователей
  //Добавляем пользователей как объект, состоящий из username и roomId
  //username будет использоваться как индентификатор
  const addUser = ({ username, roomId }) => {
    //Проверяем входящий username с уже имеющимся ником, если совпадении нет,
    //то добавляем в массив нового пользователя
    if (!users.find(user => user.username === username)) {
      users.push({ username: username, roomId: roomId })
    }

    //Выполняем запрос на получение пользователей
    getUsers()
  }

  //Обрабатываем удаление пользователя
  //на вход передаем имя пользователя
  const removeUser = (username) => {
    //Для удаления пользователя находим его индекс имени в массиве 
    const index = users.findIndex((user) => {
      return user.username === username
    })
    console.log(users);
    console.log(index);
    
    //Если же индекс найден, то удаляем пользователя по индексу его имени
    if (index > -1) {
      users.splice(index, 1)
    }
    
    getUsers()
  }

  socket.on('user:get', getUsers)
  socket.on('user:add', addUser)
  socket.on('user:leave', removeUser)
}
