using PersonCrud.Api.Common;
using PersonCrud.Api.Dtos;
using PersonCrud.Api.Interfaces;
using PersonCrud.Api.Models;

namespace PersonCrud.Api.Services;

public class PersonService : IPersonService
{
    private readonly IPersonRepository _repository;

    public PersonService(IPersonRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<PersonResponse>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var people = await _repository.GetAllAsync(cancellationToken);
        return people.Select(ToResponse).ToList();
    }

    public async Task<PersonResponse?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        var person = await _repository.GetByIdAsync(id, cancellationToken);
        return person is null ? null : ToResponse(person);
    }

    public async Task<PersonResponse> CreateAsync(CreatePersonRequest request, CancellationToken cancellationToken = default)
    {
        var person = new Person
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            BirthDate = request.BirthDate,
            Address = request.Address.Trim(),
            CreatedAt = DateTimeOffset.UtcNow
        };

        var created = await _repository.AddAsync(person, cancellationToken);
        return ToResponse(created);
    }

    private static PersonResponse ToResponse(Person person)
    {
        return new PersonResponse(
            person.Id,
            person.FirstName,
            person.LastName,
            person.BirthDate,
            AgeCalculator.Calculate(person.BirthDate),
            person.Address,
            person.CreatedAt,
            person.UpdatedAt
        );
    }
}
