// Стили
import { Accordion, Card, Badge } from 'react-bootstrap'
// Иконки
import { RiRadioButtonLine } from 'react-icons/ri'
import { FiUsers } from 'react-icons/fi';

export const UserList = ({users}) => {
  
  return (
    <Accordion>
      <Card>
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
        {users.map((user) => (
              <Card.Body key={user.username}>
                <RiRadioButtonLine
                  className={'mb-1 text-success'}
                  size='0.8em'
                />{' '}
                {user.username}
              </Card.Body>
        ))}
      </Card>
    </Accordion>
  )
}
