// Стили
import { Card, Badge, ListGroup } from 'react-bootstrap'
// Иконки
import { RiRadioButtonLine } from 'react-icons/ri'
import { FiUsers } from 'react-icons/fi';

export const UserList = ({users}) => {
  
  return (
      <Card style={{ height: '50%' }}>
        <Card.Header 
          style={{ 
            fontSize: '1.35em',
            fontWeight: '500',
            backgroundColor: '#B5E0DB',
            borderRadius: '0' 
          }}
        >
            <FiUsers /> {' '} Active users{' '}
            <Badge variant='light' className='ml-1'>
              {users.length}
            </Badge>
        </Card.Header>
        <ListGroup style={{ overflow: 'auto' }}>
          {users.map((user) => (
                <ListGroup.Item key={user.username} 
                  style={{ 
                    border: 'none',
                    padding: '5px 12px'
                  }}>
                  <RiRadioButtonLine
                    className={'mb-1 text-success'}
                    size='0.8em'
                  />{' '}
                  {user.username}
                </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
  )
}
