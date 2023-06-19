infra-up:
	docker-compose -f .development/docker-compose.yml up -d
infra-down:
	docker-compose -f .development/docker-compose.yml down
infra-logs:
	docker-compose -f .development/docker-compose.yml logs -f
