# grover-engineering-recruitment

### For running in one command you need Docker installed on your target host

#### After `npm run dc:up` visit [http://localhost:3000](http://localhost:3000)

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Run ESLint --fix
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests
- `npm run test:coverage`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose

#### For development without docker you need postresql (11 preffered) installed.

##### I use [Moleculer](https://moleculer.services/) in this project.
##### It's amazing framework.
