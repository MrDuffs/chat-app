//Форматирование даты и времени
import moment from 'moment'
// Стили
import { ListGroup, Card, Button } from 'react-bootstrap'
// Иконка
import { AiOutlineDelete } from 'react-icons/ai'

export const MessageListItem = ({ msg, removeMessage }) => {
  //Обрабатываем удаление сообщения
  const handleRemoveMessage = (id) => {
    removeMessage(id)
  }

  const { messageId, messageText, senderName, createdAt, currentUser } = msg
  return (
    <ListGroup.Item
      className={`d-flex ${currentUser ? 'justify-content-end' : ''}`}
      style={{ border: 'none' }}
    >
      <Card
        bg={`${currentUser ? 'primary' : 'light'}`}
        text={`${currentUser ? 'light' : 'dark'}`}
        style={{ 
          width: '45%', 
          borderRadius: '10px' 
        }}
      >
        <Card.Header className='d-flex justify-content-between align-items-center'>
          {/* передаем moment дату создания сообщения */}
          <Card.Text className='small'>{moment(createdAt).format('LT')}</Card.Text>
          <Card.Text style={{ fontSize: '1.1em', fontWeight: '500' }} >{senderName}</Card.Text>
        </Card.Header>
        <Card.Body className='d-flex justify-content-between align-items-center'
          style={{ 
            minHeight: '50px'
          }}
        >
          <Card.Text style={{ fontSize: '1.1em' }}>{messageText}</Card.Text>
          {/* удалять сообщения может только отправивший их пользователь */}
          {currentUser && (
            <Button
              variant='none'
              className='text-warning'
              onClick={() => handleRemoveMessage(messageId)}
            >
              <AiOutlineDelete />
            </Button>
          )}
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}
