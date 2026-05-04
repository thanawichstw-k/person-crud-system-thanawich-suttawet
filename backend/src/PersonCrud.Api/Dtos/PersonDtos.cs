namespace PersonCrud.Api.Dtos;

public record CreatePersonRequest(
    string FirstName,
    string LastName,
    DateOnly BirthDate,
    string Address
);

public record PersonResponse(
    long Id,
    string FirstName,
    string LastName,
    DateOnly BirthDate,
    int Age,
    string Address,
    DateTimeOffset CreatedAt,
    DateTimeOffset? UpdatedAt
);
