export DOCKER_IMAGE=local/pv/api/ip:app
export DOCKER_BUILD_PATH = Dockerfile ..
export SOURCE_IMAGE=thanarat/ip-app:latest

infra-up:
	docker-compose -f .development/docker-compose.yml up -d

infra-down:
	docker-compose -f .development/docker-compose.yml down

infra-logs:
	docker-compose -f .development/docker-compose.yml logs -f

build:
	docker build -t $(DOCKER_IMAGE) -f $(DOCKER_BUILD_PATH)

push:
	docker push $(SOURCE_IMAGE)

tag:
	docker tag $(DOCKER_IMAGE) $(SOURCE_IMAGE)
