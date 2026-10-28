import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

async function run() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    await client.connect();
    console.log("Connected to database...");

    try {
        // 0. Очищаем старые посты, чтобы не было записей с пустым userId
        await client.query(`
            DELETE FROM public."Post";
        `);
        console.log("Old posts cleared successfully.");

        // 1. Создаем таблицу User
        await client.query(`
            CREATE TABLE IF NOT EXISTS public."User" (
                "id" TEXT NOT NULL,
                "email" TEXT NOT NULL,
                "password" TEXT NOT NULL,
                CONSTRAINT "User_pkey" PRIMARY KEY ("id")
            );
        `);
        console.log("Table 'User' created or already exists.");

        // 2. Создаем уникальный индекс для email
        await client.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON public."User"("email");
        `);
        console.log("Index 'User_email_key' created.");

        // 3. Добавляем колонку userId в Post
        await client.query(`
            ALTER TABLE public."Post" ADD COLUMN IF NOT EXISTS "userId" TEXT;
        `);
        console.log("Column 'userId' added to 'Post'.");

        // 4. Безопасно связываем Post с User (Foreign Key)
        await client.query(`
            DO $$ 
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'Post_userId_fkey'
                ) THEN
                    ALTER TABLE public."Post" ADD CONSTRAINT "Post_userId_fkey" 
                    FOREIGN KEY ("userId") REFERENCES public."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
                END IF;
            END $$;
        `);
        console.log("Foreign key constraint added or already exists!");

    } catch (err) {
        console.error("Migration error:", err);
    } finally {
        await client.end();
    }
}

run();