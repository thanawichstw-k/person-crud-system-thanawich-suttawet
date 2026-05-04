using PersonCrud.Api.Models;

namespace PersonCrud.Api.Interfaces;

public interface IPersonRepository
{
    Task<List<Person>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Person?> GetByIdAsync(long id, CancellationToken cancellationToken = default);
    Task<Person> AddAsync(Person person, CancellationToken cancellationToken = default);
}
