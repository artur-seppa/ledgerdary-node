# Challenge

https://gist.github.com/talyssonoc/18be9d9a4d50d175517bacaf52e2a29d

https://gist.github.com/talyssonoc/438d34d3b2a63fba3e3e7d22ac57de8d

# Ledgerdary - Introduction

Ledgerdary is a [ledger](https://en.wikipedia.org/wiki/Ledger) management application, a record of financial operations with support to multiple curriencies and ledgers.

## Main concepts

- Entry: each entry is an operation that is recorded by the application, containing its type ("in" or "out"), amount, currency, date and destination ledger
- Ledger: a ledger is a label under where operations can be assigned to, a "division" of the record
- Currency: each money system represented in the application. Some examples are: USD (US dollar), BRL (Brazil real), EUR (Euro)

## Given scenario

As of right now, Ledgerdary only supports creating and listing all the entries. There is a limited set of supported currencies so the user can't create any entry that is not from some registered currency. If the destination ledger does not exist yet, the application creates it. The amount should always be a positive floating-point number, that represents the amount of the given currency.

### API endpoints

#### Create entry: **POST `/entries`**

After an entry is created, it is added to the last page of the list of entries.

**Expected body**

```json
{
  "type": "in" or "out",
  "ledger": "<ledger name>",
  "amount": <number>,
  "currency": "<currency symbol>"
}
```

**Responses**

`On success`:

Status: `201 - Created`

Content:

```json
{
  "success": {
    "message": "New entry added to <ledger name> ledger"
  }
}
```

`On validation error`:

Status: `422 - Unprocessable Entity`

Content:

```json
{
  "error": {
    "message": "Validation error",
    "details": ["Amount should be a positive integer", "Invalid currency", "Ledger name can not be empty", "Invalid entry type"]
  }
}
```

---

#### List entries: **GET `/entries?page=number&in_currency=currency_code`**

**Params**

- `page`: This param is optional. If not provided, the endpoint will respond with all the entries. If provided, each page responds with at most 7 entries. Page number increases in ascending insert date order
- `in_currency`: This param is optional. Makes the endpoint convert all the entries to the given currency

**Responses**

`On success`:

```json
[
  {
    "type": "in" or "out",
    "ledger": "<ledger name>",
    "amount": <number>,
    "currency": "<currency>",
    "date": <number>,
  },
  // ...
]
```

`On invalid param`:

```json
{
  "error": {
    "message": "Validation error",
    "details": ["Invalid currency", "Page should be a positive integer"]
  }
}
```

---

#### List all currency exchange rates **GET /exchange_rates**

**Response**

```json
{
  "USD-BRL": <floating-point number>,
  "BRL-USD": <floating-point number>,
  "EUR-BRL": <floating-point number>,
}
```

## Critics to the original code

In addition to a Merge Request for each stack you're being evaluated, it's expected from you to write a document criticizing the original code provided, where you can mention things that you would change or refactor if it was a real client project. Use the setup and code exploration phase to pay attention to informations that you would add to this document.

The document should be provided in a file called `critics.md` in the Merge Request.

## Repositories

Use only the ones your evaluator instruct you to:

- [Ruby](https://github.com/codeminer42-avaliacoes/ledgerdary-ruby)
- [Node](https://github.com/codeminer42-avaliacoes/ledgerdary-node)
- [Frontend](https://github.com/codeminer42-avaliacoes/ledgerdary-frontend)

## System dependencies

The application was developed using the following tools. Other versions might work, but weren't tested:
- Ruby 3.1.2
- PostgreSQL 14.3
- Docker (recommended)

## Configuration

In order to ensure everyone's environment runs similarly we set Docker up to run the application and necessary services.

You can start it by running from the repository root directory:

- `docker-compose up` - This will start:
  - The rails web server listening on port 3000
  - The PostgreSQL database listening on port 5432
  - Make sure all those ports aren't in use by anything else on your machine
  - This will also ensure the `development` and `test` are created

## Running commands inside the container

There's a helper script you can use to run commands inside the running Rails container

- `./scripts/run <command to run>` - This is useful, e.g., to:
  - Install dependencies: `./scripts/run bundle install`
  - Run generators: `./scripts/run rails generate model Pet name:string`
  - Run specs: `./scripts/run bundle exec rspec`
  - any other commands you'd run on the root of your rails application


## Requisites

- Node 16+
- npm 8.5+
- Docker and docker-compose

## Setup

Create a copy of `.env.example` called `.env` and replace the default values if necessary

```sh
$ cp .env.example .env
```

```sh
$ npm run docker:install
```

Create the databases for development and test

```sh
$ npm run docker:db:create:dev
$ npm run docker:db:create:test
```

## Development: Running the project

Before running the project, be sure to run the database migrations and seeds:

```sh
$ npm run docker:db:migrate:dev
$ npm run docker:db:seed:dev
```

Then you can run the stack:

```sh
$ npm run docker:dev
```

## Testing: Running the tests

Before running the tests, be sure to run the database migrations in the test environment:

```sh
$ npm run docker:db:migrate:test
```

Then you can run the tests:

```sh
$ npm run docker:test
```

## Rolling back

If needed, you may run the rollback commands:

```sh
$ npm run docker:db:rollback:<test|dev>
```
