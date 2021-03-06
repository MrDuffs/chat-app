# Chat App

## Структура проекта

```
- client - клиент
  - public
    - index.html - шаблон разметки
  - src
    - components
      - Chat Room
        - MessageForm
          - MessageForm.js - форма для отправки сообщений
        - MessageList
          - MessageList.js - список сообщений
          - MessageListItem.js - компонент одного сообщения
        - UserList
          - UserList.js - список пользователей
        - ChatRoom.js - страница комнаты чата
      - Home
        - Home.js - главная страница
      - index.js - экспорт компонентов
    - hooks
      - index.js - экспорт хуков
      - useBeforeUnload.js - хук для выполнения операций перед закрытием страницы
      - useChat.js - хук для установки соединения с сервером и обработки событий
      - useLocalStorage.js - хук для записи/получения значений из локального хранилища
    - App.js - основной компонент приложения
    - index.js - основной файл клиента
    - jsconfig.json - настройки компилятора
    ...
- server - сервер
  - db - директория для хранения сообщений/локальная база данных
  - handlers
    - messageHandlers.js - обработчики получения/добавления/удаления сообщений
    - userHandlers.js - обработчики получения/добавления/удаления пользователей
  - index.js - основной файл сервера
- ...
```

## Стек технологий

*Общие*:

- Concurrently
- Nanoid

*Сервер*:

- LowDB
- Socket.io
- Supervisor

*Клиент*:

- React
- ReactDOM
- React Router DOM
- Socket.io Client
- Bootstrap & React Bootstrap
- Styled Components
- Emoji Mart
- React Icons
- Moment

## Запуск приложения

Для запуска приложения необходимо сделать следующее:

- Клонировать репозиторий

```js
git clone https://github.com/MrDuffs/chat-app.git
```

- Установить общие зависимости, а также зависимости сервера и клиента

```bash
yarn
# или
npm i

cd client

yarn
# или
npm i

cd ..
cd server

yarn
# или
npm i
```

- Выполнить команду, находясь в корневой директории проекта

```bash
yarn start
# или
npm start
```
