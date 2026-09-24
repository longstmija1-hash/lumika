# lumika

ЛЮМИКА — онлайн-школа программирования и школьных предметов.

## Направления

- `/` — Scratch, JavaScript и Go: подбор курса, программа по этапам, фиксированные цены и запись на бесплатное знакомство.
- `/school` — математика, физика, русский язык, история, обществознание и английский язык; школьная программа, ОГЭ и ЕГЭ.

## Локальный запуск

Требуется Node.js 20 или новее.

```bash
cd frontend
npm ci
npm run dev
```

Откройте http://localhost:3000.

## Заявки в Telegram

Скопируйте `frontend/.env.example` в `frontend/.env.local` и заполните `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`. Секреты используются только серверным обработчиком `/api/leads` и не должны попадать в Git.

Без настроенного Telegram форма покажет ошибку отправки. Бесплатное знакомство длится 20–30 минут. Email необязателен.

## Production

```bash
cd frontend
npm ci
npm run build
npm start
```

Для Vercel укажите **Root Directory: `frontend`**, framework Next.js и переменные Telegram в настройках проекта. Не задавайте `NEXT_PUBLIC_API_URL`, если используете встроенный обработчик Next.js.

## Структура

- `frontend/src/app` — страницы, стили и API.
- `frontend/src/components` — интерфейс, формы, программы и аналитика.
- `frontend/src/data` — содержание и стоимость курсов.
- `frontend/public` — изображения и портреты.
- `frontend/qa` — браузерные проверки с перехватом отправки заявок.
- `backend/leads_service` — дополнительный FastAPI-сервис; для запуска лендинга со встроенным API не требуется.

Технологии: Next.js 15, React 18, CSS, Tailwind CSS, Lucide. Шрифты хранятся локально, лицензии находятся рядом с ними.

Описание изменений, проверок и настройки событий аналитики: [frontend/REDESIGN.md](frontend/REDESIGN.md).
