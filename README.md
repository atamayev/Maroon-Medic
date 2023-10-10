# Maroon-Medic
Veterinarian Booking Platform

To run Redis, follow the following steps:
1. Install Docker Desktop, open it
2. Run: `docker pull redis` in console
3. Run `docker rm /some-redis`
4. Run `docker run -p 6379:6379 --name some-redis -d redis`

Before Pushing Code, always run:
1. `npm run lint` Make sure there are no errors before pushing to the repo.
2. `npm run type-check`

or, run `npm run validate` to run both commands at once.
