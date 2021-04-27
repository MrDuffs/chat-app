import { useState, useRef } from 'react'
//Для маршрутизации используем react-router-dom
import { Link } from 'react-router-dom'
// Подключаем наш хук
import { useLocalStorage } from 'hooks'
// Стили
import { Form, Button, Card } from 'react-bootstrap'
// подключаем иконку
import { TiMessages } from 'react-icons/ti'

export function Home() {
  //Создаем и записываем в локальное хранилище имя пользователя
  //или извлекаем его из хранилища
  const [username, setUsername] = useLocalStorage('username', '')
  //Локальное состояние комнаты
  const [roomId, setRoomId] = useState('free')
  const linkRef = useRef(null)

  //Обрабатываем изменение имени пользователя
  const handleChangeName = (e) => {
    setUsername(e.target.value)
  }

  //Обрабатываем изменение комнаты
  const handleChangeRoom = (e) => {
    setRoomId(e.target.value)
  }

  //Имитируем отправку формы
  const handleSubmit = (e) => {
    e.preventDefault()
    //Выполняем нажатие кнопки
    linkRef.current.click()
  }

  //Удаляем лишние пробелы
  const trimmed = username.trim()

  return (
    <Card
      className='mt-5' 
      style={{ maxWidth: '425px', margin: '0 auto' }}
    >
      <Card.Header
        style={{
          fontSize: '2em', 
          textAlign: 'center',
          fontWeight: '600',
          backgroundColor: '#B5E0DB'
        }}
      >
        <TiMessages /> Chat App
      </Card.Header>
      <Form
        className='mt-3'
        style={{ width: '310px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
           value={username} 
           placeholder='Enter your username...' 
           onChange={handleChangeName}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Room:</Form.Label>
          <Form.Control as='select' value={roomId} onChange={handleChangeRoom}>
            <option value='free'>Free</option>
            <option value='dev'>Dev</option>
            <option value='job'>Job</option>
          </Form.Control>
        </Form.Group>
        <Link to={`/${roomId}`} ref={linkRef} style={{ textDecoration: 'none' }}>
            <Button className='mt-4'
              style={{ marginBottom: '1.5em',
                fontSize: '1.25em',
                fontWeight: '500'
              }}
              variant='success'
              block
              disabled={trimmed ? false : true}
            >
              Join Chat
            </Button>
        </Link>
      </Form>
    </Card>
  )
}
