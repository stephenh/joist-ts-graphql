.PHONY: compile build start start-tracing db test redb hard-reset

compile:
	rm -fr dist/
	yarn
	yarn graphql-codegen
	yarn build

build:
	docker compose build

start:
	docker compose up graphql

start-tracing:
	docker compose up graphql-tracing

# Start the database and applies migrations; assumes we're not in docker.
db:
	docker compose up --wait db
	yarn migrate

# Recreate the database for applying migrations from scratch.
# TODO: we use the `sleep 10` hack to work around "database is in recovery mode" errors. We should ideally fix this
# to be more deterministic
redb:
	docker compose up --wait db
	docker compose exec db ./reset-database.sh
	yarn migrate
	yarn codegen

rebuilddb:
	docker compose rm -s -f db
	docker compose build --no-cache db
	docker compose up --wait db
	yarn migrate
	yarn codegen

rebuild:
	docker compose rm -s -f graphql
	docker compose build --no-cache graphql
	docker compose up graphql

hard-reset:
	@echo "This will reset your local environment. Any unsaved changes will be lost. Proceed? [y/N] " && read ans && [ $${ans:-N} == y ]
	git clean -fdx
	yarn
	yarn graphql-codegen
	docker compose build --no-cache
	make redb

psql:
	docker compose exec db psql --username homebound --dbname homebound

psql1:
	docker compose exec db psql --username homebound --dbname homebound_tests_1

# Runs the tests, assumes that `make db` has been ran.
test:
	yarn test

# Runs the circleci build step locally
circleci-build:
	docker compose up -d --force-recreate tests
	docker compose exec tests yarn migrate
	docker compose exec tests ./node_modules/.bin/jest --testTimeout 10000 --detectOpenHandles
