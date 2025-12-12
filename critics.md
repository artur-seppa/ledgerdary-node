# Critics

## Build Process

The project's docker-compose.yml file includes a version tag. While this was once required, it is now considered outdated practice. Since the release of Docker Compose V2, the tool automatically uses the latest specification, and the version line is deprecated. If left in the file, it is simply ignored and generates a harmless warning. For a cleaner, more modern setup that follows current best practices, this line can safely be removed, allowing the file to start directly with the services: section. This aligns with the official guidance in the Docker Compose Specification: https://docs.docker.com/reference/compose-file/

## Controllers

It would be beneficial to separate controllers, serializers, and handlers into distinct layers, allocating a dedicated layer for each functionality and respecting the overall structure organization.

## Handlers

I observed that several handlers (createEntryHandler, listEntryHandler, and showBalanceHandler) contain validation schema definitions that could be extracted into a separate layer. This would promote dependency injection and adhere to the Single Responsibility Principle (SOLID) by having handlers focus solely on data extraction, calling the validation layer when necessary, invoking the use case, and returning the formatted response using an externally implemented serializer.

Using the same handlers as an example, I noticed it lacks an error validation layer implementation, which would be useful even for server errors to prevent exposing internal server data.

## Serializer

The serializers currently in use could be separated into a dedicated layer rather than residing within the controller. Additionally, they should have a single responsibility. For instance, the entrySerializer contains a convertToDecimal method that could be externalized to the Money domain. Furthermore, a map is used in the handler to serialize each item, which is a responsibility that could be allocated to the serializer itself.

## Tests

Since each handler has multiple responsibilities, only integration tests were implemented. By applying SOLID principles, unit tests could be implemented for use cases and repositories of each functionality. Additionally, I think a more organized structure would be to unify all tests in a single directory, separating what is e2e from what is unit testing.


