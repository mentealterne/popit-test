local:
	@docker-compose stop && docker-compose up --build -d --force-recreate --no-deps [-d] --remove-orphans
