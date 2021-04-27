import { useEffect, useRef, useState } from 'react'
//Получаем класс IO
import io from 'socket.io-client'
//Подключаем свои хуки
import { useLocalStorage, useBeforeUnload } from 'hooks'

//Адрес сервера
//требуется перенаправление запросов
const SERVER_URL = 'http://localhost:5000'

//хук принимает название комнаты
export const useChat = (roomId) => {
  //локальное состояние для пользователей
  const [users, setUsers] = useState([])
  //локальное состояние для сообщений
  const [messages, setMessages] = useState([])

  //получаем из локального хранилища имя пользователя - идентификатор
  const [username] = useLocalStorage('username')

  //useRef() - используется для хранения мутирующих значений в течении
  //всего жизненного цикла
  const socketRef = useRef(null)

  useEffect(() => {
    //Создаем экземпляр сокета, передаем ему адрес сервера
    //и записываем объект с названием комнаты в строку запроса "рукопожатия"
    //socket.handshake.query.roomId
    socketRef.current = io(SERVER_URL, {
      query: { roomId }
    })

    //Отправляем событие - добавление пользователя
    //в качестве данных передаем объект с именем и id комнаты
    socketRef.current.emit('user:add', { username, roomId })

    //Обрабатываем получение списка пользователей
    socketRef.current.on('users', (users) => {
      //обновляем массив пользователей
      setUsers(users)
    })

    //Отправляем запрос на получение сообщений
    socketRef.current.emit('message:get')

    //Обрабатываем получение сообщении
    socketRef.current.on('messages', (messages) => {
      //Определяем, какие сообщения были отправлены данным пользователем,
      //если значение свойства senderName объекта сообщения совпадает с идентификатором
      // пользователя, то добавляем в объект сообщения свойство currentUser
      //со значением true, иначе просто возвращаем объект сообщения
      const newMessages = messages.map((msg) =>
        msg.senderName === username ? { ...msg, currentUser: true } : msg
      )

      //Обновляем массив сообщений
      setMessages(newMessages)
    })

    return () => {
      //При размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect()
    }
  }, [roomId, username])

  //Функция отправки сообщения
  //Принимает объект с текстом сообщения и именем отправителя
  const sendMessage = ({ messageText, senderName }) => {
    socketRef.current.emit('message:add', {
      messageText,
      senderName
    })
  }

  //функция удаления сообщения по id
  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id)
  }

  //Удаление пользователя по username
  const removeUser = (username) => {
    socketRef.current.emit('user:leave', username)
  }

  //Отправляем на сервер событие "user:leave" перед перезагрузкой страницы
  useBeforeUnload(() => {
    removeUser(username)
  })

  //Хук возвращает пользователей, сообщения и функции для отправки, удаления
  //сообщений
  return { users, messages, sendMessage, removeMessage, removeUser }
}
