/**
 * Base email template for all emails
 * @param content - The dynamic content of the email
 * @returns HTML string for the email
 */
import { env } from '@/env'

const BASE_URL = env.NEXT_PUBLIC_BASE_URL

export function emailTemplate(content: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Syncara Email</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          background-color: #f4f4f4;
          color: #152F6B;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #41AAFF;
          padding: 20px;
          text-align: center;
        }
        .header img {
          max-width: 100px;
        }
        .content {
          padding: 30px;
          text-align: center;
        }
        .content h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #152F6B;
        }
        .content p {
          font-size: 16px;
          line-height: 1.5;
          color: #152F6B;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #41AAFF;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
        }
        .footer {
          padding: 20px;
          text-align: center;
          background-color: #f4f4f4;
          font-size: 12px;
          color: #666666;
        }
        @media only screen and (max-width: 600px) {
          .content {
            padding: 20px;
          }
          .content h1 {
            font-size: 20px;
          }
          .content p {
            font-size: 14px;
          }
          .button {
            font-size: 14px;
            padding: 10px 20px;
          }
        }
      </style>
    </head>
    <body>
      <table class="container" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="header">
            <img src="${BASE_URL}/Syncara_light.png" alt="Syncara Logo" />
          </td>
        </tr>
        <tr>
          <td class="content">
            ${content}
          </td>
        </tr>
        <tr>
          <td class="footer">
            <p>&copy; ${new Date().getFullYear()} DoubleSS events. All rights reserved.</p>
            <p>If you did not request this email, please ignore it.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
