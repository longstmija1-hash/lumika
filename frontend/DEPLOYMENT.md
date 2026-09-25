# Развёртывание ЛЮМИКИ на Vercel

- Репозиторий: `longstmija1-hash/lumika`
- Production Branch: `main`
- Framework Preset: `Next.js`
- Root Directory: `frontend`
- Build Command: стандартная команда Next.js (`npm run build`)
- Output Directory: значение по умолчанию

## Отправка заявок

В Settings → Environment Variables задайте для Production:

- `TELEGRAM_BOT_TOKEN` — токен бота.
- `TELEGRAM_CHAT_ID` — чат для заявок.

Не добавляйте префикс `NEXT_PUBLIC_` к этим переменным и не сохраняйте значения в Git.
`NEXT_PUBLIC_API_URL` оставьте незаданным, чтобы обе формы использовали серверный маршрут этого сайта `/api/leads`.

После изменения переменных выполните Redeploy.

## Проверка публикации

1. В Deployments дождитесь статуса Ready для последнего коммита main.
2. Откройте `/` и `/school`, проверьте изображения и favicon.
3. Отправьте по одной явно помеченной тестовой заявке с каждой страницы.
4. Проверьте сообщение об успехе на сайте и получение заявок в Telegram.

Если новый push не появился в Deployments, проверьте Settings → Git: проект должен быть подключён к этому репозиторию и ветке main.
