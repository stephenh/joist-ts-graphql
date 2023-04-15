.PHONY: build start db redb psql

start:
	docker compose up graphql

db:
	docker compose up --wait db
	yarn pg-migrate
	yarn joist-codegen

redb:
	docker compose up --wait db
	docker compose exec db ./reset.sh
	yarn pg-migrate
	yarn joist-codegen

psql:
	docker compose exec db psql --username sample_user --dbname sample_app
