using Microsoft.EntityFrameworkCore;
using PersonCrud.Api.Data;
using PersonCrud.Api.Interfaces;
using PersonCrud.Api.Models;

namespace PersonCrud.Api.Repositories;

public class PersonRepository : IPersonRepository
{
    private readonly AppDbContext _db;

    public PersonRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Person>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _db.People
            .AsNoTracking()
            .OrderBy(x => x.Id)
            .ToListAsync(cancellationToken);
    }

    public async Task<Person?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await _db.People
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<Person> AddAsync(Person person, CancellationToken cancellationToken = default)
    {
        _db.People.Add(person);
        await _db.SaveChangesAsync(cancellationToken);
        return person;
    }
}
