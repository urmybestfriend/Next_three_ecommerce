# Setting Up

## MongoDB Setup

- Visit <https://account.mongodb.com/account/register> to create a new account
- Now login from <https://account.mongodb.com/account/login>
- Under `Deployment` click on `Database`
- Click the `Create` button to create a new cluster (just follow the instructions to complete)
- Get your connection string by clicking on the `Connect` button and select `Connect your application`.
- Ensure that `Node.js` is selected in the dropdown for `Driver` and the latest version is selected.
- Click on the copy icon to copy your connection string or you can copy it manually and paste it somewhere safe.

## Environment Setup

- In the root directory, create a copy of the `.env.example` file and rename it to `.env`
- Provide the values of each of the properties in `.env` file.
- The content of your new `.env` file should look like:

``` dotenv
    MONGODB_CONN_STR=the-connection-string-you-copied
    JWT_SECRET=yourjwtsecret
    JWT_REFRESH_SECRET=yourjwtrefreshsecret
    ...
```

**NB If you want to connect to a local instance of the MongoDB, then the value of the `MONGODB_CONN_STR` should be `mongodb://localhost:27017`**

## Payment Setup with Stripe

- Visit [stripe](https://stripe.com) to create an account
- Activate your account by filling out your business profile to accept payments on stripe.
- Navigate to your dashboard and copy your secret key.
- NB: Ensure to keep this safe

## Deploying to Heroku

(with Compute Geometry server running on a Windows Server)

### Prerequisites

1. You have an account on [Heroku](https://heroku.com).
2. You've downloaded and installed the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install).

#### Setup

1. If you haven't already done so, open up a terminal, clone this repository, and navigate to the resulting directory:

``` bash
git clone https://github.com/karlsonvomdach2000/StartEnoch.git
cd StartEnoch
```

2. From the terminal, login to Heroku:

``` bash
heroku login
```
**NB: You will be prompted to enter your credentials either directly in the terminal or from the browser.**

3. From the terminal, create the Heroku application (you can specify a name here, otherwise heroku will assign a name to your app):

``` bash
heroku create myappname
```

You will see that your app was created and has a domain and a git repository:

```
Creating myappname... done
https://myappname.herokuapp.com | https://git.heroku.com/myappname.git
```

5. Add configuration variables. These are the variables in your `.env` file
   - From the terminal, set the `MONGODB_CONN_STR` variable. The VALUE of this should be the connection string to your remote mongodb instance as described in the [MongoDB Setup](#mongodb-setup) section.

   ```bash
   heroku config:set MONGODB_CONN_STR=yourmongodbconnectionstring
   ```

   - From the terminal, do same for `JWT_SECRET` variable.

   ```bash
   heroku config:set JWT_SECRET=yourjwtsecret
   ```

   NB: Keep set the variables until all of them in the `.env` are exhausted.

6. Push the code to Heroku:

```bash
git push heroku main
```

7. Heroku will do all the necessary build and when the build is successful, you should see the url to to your app. Click on the link or you can run the following command in the terminal to open it.

```bash
heroku open
```

8. Navigate in a browser to your [Heroku dashboard](https://dashboard.heroku.com/). There you should see your new application. Click on your application name view it. You can view the logs by clicking on the `More` button and selecting `View logs`.

9. NB: As of November 2022, heroku discontinued **free dynos** so you will have to subscribe to one of their paid dynos before your app can be made available publicly.
Visit <https://dashboard.heroku.com/account/billing> to get setup.


**NB: Ensure to change the value of the `NEXT_PUBLIC_API_URL` in the [next.config.js](../frontend/next.config.js)** to the url of your herokuapp (with the /api at the end)
