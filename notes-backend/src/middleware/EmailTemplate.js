
const VerificationTamplate = `<!DOCTYPE html>
<html>
<head>
  <title>Welcome Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      background-color: #f4f4f9;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
    }
    p {
      color: #666666;
    }
    a {
      color: #1a73e8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
    <h1> {verificationCode} </h1>
    <p>If you did not create an account, no further action is required. If you have any questions, feel</p>
    <p>Md Ahmad Raza, <br>The Team</p>
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p
    </div>
  </div>
</body>
</html>
`



const welcomEmailTemplate = `<!DOCTYPE html>
  <html>
  <head>
    <title>Welcome to Our App</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f9f9f9;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333333;
      }
      p {
        color: #555555;
        font-size: 16px;
      }
      a {
        display: inline-block;
        background-color: #007bff;
        color: #ffffff;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        font-size: 16px;
      }
      a:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Hello {name} ,</h1>
      <p>We're thrilled to have you join us! Your registration was successful, and we are committed to notes</p>
      <p>Click the button below to explore:</p>
      <p><a href="{appLink}" target="_blank">Get Started</a></p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br>The Team</p>
    </div>
  </body>
  </html>`

export {
    VerificationTamplate, welcomEmailTemplate
}
