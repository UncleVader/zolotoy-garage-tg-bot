import { NextResponse } from 'next/server'
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is not set')
}

const bot = new TelegramBot(token)

// Set the webhook URL (you'll need to do this manually or in your bot initialization)
// Use this command in your browser or with curl:
// https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_WEBSITE_URL>/api/telegram

export async function POST(req: Request) {
    try {
        const update = await req.json()

        if (update.message) {
            const chatId = update.message.chat.id
            const text = update.message.text

            if (text === '/start') {
                const opts = {
                    reply_markup: {
                        keyboard: [
                            [{ text: 'Моя історія обслуговування', web_app: { url: 'https://zolotoy-garage.dieselservice.com.ua/' } }],
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: false
                    }
                }
                await bot.sendMessage(chatId, 'Вітаємо! Натисніть кнопку "Моя історія обслуговування" щоб почати роботу із додатком', opts)
            } else if (text === '/run') {
                await bot.sendMessage(chatId, 'You clicked the button!')
            }
        }

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Error in Telegram webhook:', error)
        return NextResponse.json({ ok: false }, { status: 500 })
    }
}

