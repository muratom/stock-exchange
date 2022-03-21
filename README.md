# Пользовательский модуль приложения "Биржа акций"

Web-приложение, обеспечивающее работу брокера, у него есть запас денежных средств,
он имеет возможность купить или продать акции (любое доступное количество),
а также контролировать изменение котировок акций. В приложении должен отображаться баланс
(запас денежных средств плюс стоимость акций), с которым брокер начал день, и текущее состояние.

* Клиентская сторона реализована с помощью библиотеки **React**;
* В качестве сервера используется фреймворк **ExpressJS**;
* Для поддержки нескольких пользователей на стороне сервера используется библиотека **SocketIO** (_web-сокеты_);
* Настройки биржи приложение получает из JSON-файла с настройками;
* Предусмотрена HTML-страница администратора, на которой отображается перечень участников.
Для каждого участника отображается его баланс, количество акций каждого типа у каждого участника и количество,
выставленное на торги. Предусмотрена кнопка «Начало торгов» и выбор закона распределения для цены акций;
* Предусмотрена HTML-страница входа в приложение, где каждый участник указывает (или выбирает из допустимых) свое имя;
* Предусмотрена HTML-страница, на которой участнику отображается общее количество доступных ему средств,
количество и суммарная стоимость по каждому виду купленных акций. На ней же отображается количество выставленных на
торги акций, их количество и стоимость. У участника есть возможность купить/продать интересующее его количество акций.
Участнику отображается суммарный доход на начало торгов и на текущий момент времени. Участник не может купить акции,
если денег не хватает.

По умолчанию сервер запускается на _8000_ порту, а клиент - на _3000_.

### Запуск
* `npm install`
* В директории _server_: `npx nodemon app.js`
* В корне проекта: `npm start`