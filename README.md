
## Description
Simple microservice that handles the grunt work of checking for transaction updates for each of user’s crypto wallets. Node.js Express API.


##### Session Storage:
- PostgreSQL


## Requirements

- node >= 16
- npm >= 6

## Running the API
To start the application in development mode:

Create a `.env` file in the root folder. You can find reference in the `.env.example` file.
If you want to add some new variables, you also need to add them to interface and config object.

Then run:

```bash
npm install
```

Start the application in dev env:
```
npm run dev
```

Here is a [link to the Postman Documentation](https://documenter.getpostman.com/view/23687723/2s93m4XNFr).
