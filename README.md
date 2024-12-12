# Session Secure App

Session Secure App is an application that demonstrates the use of user
authentication and authorization with roles.

## Technologies Used

### Core Technologies
- **React**: JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server for modern web applications

### Additional Libraries and Tools
- **axios**: HTTP client for making API requests
- **React Router**: Client-side routing
- **js-cookie**: Simple JavaScript API for handling cookies

### Styling and UI
- **Bootstrap**: Popular CSS framework for responsive and mobile-first design

The application consists of a frontend and a backend. This project is the
frontend repository, and you can find the backend
repository [here](https://github.com/aboher/session_secure_app_backend "Session Secure App Backend").

Both frontend and backend are deployed and working together. Here are the links
to each:

- [Frontend](https://session-secure-app-frontend.pages.dev/)
- [Backend](https://vps-4547216-x.dattaweb.com)

You can test the system by creating a user. You'll need an email address that
will be verified to activate your account. If you don't want to use your
personal email, a [Temporary Email](https://temp-mail.org/) can be used.
Alternatively, you can use the default users I've created to test the
application:

| User               | Password  | Role      |
| ------------------ | --------- | --------- |
| user@mail.com      | user      | USER      |
| moderator@mail.com | moderator | MODERATOR |
| admin@mail.com     | admin     | ADMIN     |

You can log in from different browsers with different accounts to test each
role.

Here is a breakdown of what each role can do:

| Role      | Actions                                                        |
| --------- | -------------------------------------------------------------- |
| USER      | View and invalidate their own active sessions                  |
| MODERATOR | Perform user-level actions and manage session attributes       |
| ADMIN     | Perform moderator-level actions and manage all users' sessions |

In addition to these functionalities, you can also reset your password by
navigating to
the [Sign-In Page](https://session-secure-app-frontend.pages.dev/signin) and
clicking the **_I forgot my password_** link.

The application follows best practices for the registration process and password
reset, ensuring that sensitive information—such as whether an account exists—is
only sent via email to the account owner. This approach is detailed in the
following
discussion: [Account registration best practice when an account with the username already exists?](https://www.reddit.com/r/cybersecurity/comments/p37vnk/account_registration_best_practice_when_an/)

> The guidance for forgot your password changed from saying "An account with
> this email address was not found" to "If an account with that email address
> exists, you will receive an email at that address in a few minutes with
> further
> instructions" for this very reason.
>
> In fact, [it's an OWASP recommendation](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html):
> "Return a consistent message for both existent and non-existent accounts"

## How to Run the Project Locally

To run the project locally you'll just need NodeJS installed.

### Steps to Run Locally

1. Clone the repository in a folder of your choosing by opening a terminal and executing the following command:

```bash
git clone https://github.com/aboher/session_secure_app_frontend.git
```

2. Navigate to the project directory:

```bash
cd session_secure_app_frontend
```

3. Create a `.env` file for environment variable configuration:

```bash
touch .env
```

4. Open the `.env` file and copy this environment variable in it.

```
VITE_BACKEND_URL=http://localhost:8080
```

Make sure you have the backend project running in your machine too, [here](https://github.com/aboher/session_secure_app_backend) you can find the repository with instructions to run it locally.

5. Install all the dependencies with npm.

```bash
npm install
```

6. Execute this command to run the project locally.

```bash
npm run dev
```

## Deployment Information

The application is deployed at [https://session-secure-app-frontend.pages.dev/](https://session-secure-app-frontend.pages.dev/).

[Cloudflare Pages](https://pages.cloudflare.com/) was used to deploy the application, because is free and integrates with Git, allowing to deploy automatically on each push to the remote repository. Moreover, [Cloudflare Functions](https://developers.cloudflare.com/pages/functions/) was used to define a [function](./functions/api-proxy/[[paths]].js) that works as a reverse proxy, forwarding request to the backend and returning the response to the client. The purpose of this is to make the browser think that the backend service is on the same domain, and to allow the use of session and CSRF token cookies, that don't work well otherwise due to browsers restrictions on cross-site requests.
