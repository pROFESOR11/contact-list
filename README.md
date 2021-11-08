<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">

<h3 align="center">NextJS TypeScript React Contact List</h3>

<p align="center">
  TypeScript React application for managing User Contacts
  <br />
  <a href="https://contact-list-five.vercel.app/">View Demo</a>
  ·
  <a href="https://github.com/pROFESOR11/contact-list/issues">Report Bug</a>
  ·
  <a href="https://github.com/pROFESOR11/contact-list/issues">Request Feature</a>
</p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://contact-list-five.vercel.app/)

### Built With

- [Next.js](https://nextjs.org/) using [React](https://reactjs.org/)
- [Next.js API routes](https://nextjs.org/docs/api-routes/introduction) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client)
- [Typescript](https://www.typescriptlang.org/)
- [Material-UI](https://v4.mui.com/)
- Mocking data for development and testing on both client and server with [Mock Service Worker (MSW)](https://mswjs.io/)
- [Formik](https://formik.org/) forms with [yup](https://github.com/jquense/yup) validation
- Safely serialization of JavaScript expressions to a superset of JSON with [superjson](https://github.com/blitz-js/superjson)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [husky](https://github.com/typicode/husky) for commit hooks
- Unit testing with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro)
- e2e testing with [Cypress](https://www.cypress.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

- [Node.js 12.22.0](https://nodejs.org/) or later

- npm

  ```sh
  npm install npm@latest -g
  ```

- using yarn is strongly advised:
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/pROFESOR11/contact-list.git [your-project-name]
   ```
2. Install dependencies with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/):

   ```sh
   cd [your-project-name]

   npm install
   # or
   yarn
   ```

3. For database you have two options for local development:

- Using Postgres

Copy `.env.example` as `.env` and set `DATABASE_URL`:

```sh
DATABASE_URL=postgresql://__USER__:__PASSWORD__@__HOST__/__DATABASE__
```

- Using SQLite

Open [`src/prisma/schema.prisma`](./src/prisma/schema.prisma):

```diff
datasource db {
-    provider = "postgresql"
-    url      = env("DATABASE_URL")
+   provider = "sqlite"
+   url      = "file:./dev.db"
}
```

4. Run the following command to create your SQLite database file. This also creates the `Contact` and `Tag` tables that are defined in [`src/prisma/schema.prisma`](./src/prisma/schema.prisma):

```sh
npx prisma migrate dev --name init
```

5. Now, you can optionally seed the database with the sample data in [`src/prisma/seed.ts`](./src/prisma/seed.ts) by running the following command:

```sh
npx prisma db seed
```

6. Start dev server with:

```bash
yarn dev
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

This application helps user to manage his/her contacts with the following functionalities:

- Create Contact
- View Contact Details
- Update Contact
- Delete Contact

A contact may have the following attributes:

- Name
- Last Name
- Telephone number
- Email
- Date of birth
- Picture/Avatar
- Link to personal website
- Tags

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [] Acquire contact wallet addresss
- [] Abilitiy to send crypto currency with MetaMask

See the [open issues](https://github.com/pROFESOR11/contact-list/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/featureX`)
3. Commit your Changes (`git commit -m 'Add some featureX'`)
4. Push to the Branch (`git push origin feature/featureX`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Ali Cimen - ali_cimen_11@hotmail.com

Project Link: [https://github.com/pROFESOR11/contact-list](https://github.com/pROFESOR11/contact-list)

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgments

- [Why superjson?](https://github.com/vercel/next.js/issues/13209)
- [Why using PostgreSQL for Vercel deployments?](https://github.com/vercel/vercel/discussions/4556)
- [ElephantSQL for super-easy access to a PostgreSQL database](https://www.elephantsql.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/pROFESOR11/contact-list.svg?style=for-the-badge
[contributors-url]: https://github.com/pROFESOR11/contact-list/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/pROFESOR11/contact-list.svg?style=for-the-badge
[forks-url]: https://github.com/pROFESOR11/contact-list/network/members
[stars-shield]: https://img.shields.io/github/stars/pROFESOR11/contact-list.svg?style=for-the-badge
[stars-url]: https://github.com/pROFESOR11/contact-list/stargazers
[issues-shield]: https://img.shields.io/github/issues/pROFESOR11/contact-list.svg?style=for-the-badge
[issues-url]: https://github.com/pROFESOR11/contact-list/issues
[license-shield]: https://img.shields.io/github/license/pROFESOR11/contact-list.svg?style=for-the-badge
[license-url]: https://github.com/pROFESOR11/contact-list/blob/main/LICENSE
[product-screenshot]: /contact-list.png
