export async function sendTelegramMessage(
    message,
    messageThreadId
) {

    const token =
        process.env.TELEGRAM_BOT_TOKEN;

    const chatId =
        process.env.TELEGRAM_COMMUNITY_ID;

    const url =
        `https://api.telegram.org/bot${token}/sendMessage`;

    const response =
        await fetch(url, {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({

                chat_id: chatId,

                text: message,

                message_thread_id:
                    messageThreadId,
            }),
        });

    const data =
        await response.json();

    if (!response.ok) {

        console.log(
            "Telegram Error:",
            data
        );

        throw new Error(
            "Gagal kirim telegram"
        );
    }

    console.log(
        "Pesan telegram berhasil terkirim"
    );
}