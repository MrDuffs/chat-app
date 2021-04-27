import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// хуки
import { useLocalStorage, useChat } from 'hooks'
// import { useRef } from 'react'
// компоненты
import { MessageForm } from './MessageForm'
import { MessageList } from './MessageList'
import { UserList } from './UserList'
// стили
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
// подключаем иконку
import { TiMessages } from 'react-icons/ti'

export function ChatRoom() {
  const { roomId } = useParams()
  const [username] = useLocalStorage('username')
  const { users, messages, sendMessage, removeMessage, removeUser } = useChat(roomId)

  // const userRef = useRef(null)

  const removeUserFromRoomHandler = (e) => {
    removeUser(username)
  }

  return (
    <Container className='mt-5'>
      <Card >
        <Card.Header className='d-flex justify-content-between align-items-center'
          style={{
            fontSize: '2em',
            fontWeight: '600',
            backgroundColor: '#B5E0DB'
          }}
        >
            <Card.Text className='mb-0'>
              <TiMessages /> Chat App
            </Card.Text>
            <h2 className='mb-0 text-center'>Room: {roomId}</h2>
            <Button 
              style={{
                backgroundColor: '#E58080',
                border: 'none',
                fontSize: '0.6em'
              }}
              as={Link} 
              to={'/'}
              onClick={ removeUserFromRoomHandler } 
            >
                Leave Room
            </Button>

        </Card.Header>
        <Row>
          <Col sm={3} style={{ paddingRight: '0' }}>
            <UserList users={users} />
          </Col>
          <Col lg={true} style={{ paddingLeft: '0' }}>
            <MessageList messages={messages} removeMessage={removeMessage} />
            <MessageForm username={username} sendMessage={sendMessage} />
          </Col>
        </Row>

      </Card>
    </Container>
  )
}
