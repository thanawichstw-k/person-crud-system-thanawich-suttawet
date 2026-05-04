using PersonCrud.Api.Dtos;

namespace PersonCrud.Api.Interfaces;

public interface IPersonService
{
    Task<List<PersonResponse>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<PersonResponse?> GetByIdAsync(long id, CancellationToken cancellationToken = default);
    Task<PersonResponse> CreateAsync(CreatePersonRequest request, CancellationToken cancellationToken = default);
}
