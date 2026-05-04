using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using PersonCrud.Api.Common;
using PersonCrud.Api.Dtos;
using PersonCrud.Api.Interfaces;

namespace PersonCrud.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PeopleController : ControllerBase
{
    private readonly IPersonService _personService;
    private readonly IValidator<CreatePersonRequest> _createValidator;

    public PeopleController(IPersonService personService, IValidator<CreatePersonRequest> createValidator)
    {
        _personService = personService;
        _createValidator = createValidator;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<PersonResponse>>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<List<PersonResponse>>>> GetPeople(CancellationToken cancellationToken)
    {
        var people = await _personService.GetAllAsync(cancellationToken);
        return Ok(ApiResponse<List<PersonResponse>>.Ok(people, "People loaded successfully."));
    }

    [HttpGet("{id:long}")]
    [ProducesResponseType(typeof(ApiResponse<PersonResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<PersonResponse>), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiResponse<PersonResponse>>> GetPerson(long id, CancellationToken cancellationToken)
    {
        var person = await _personService.GetByIdAsync(id, cancellationToken);

        if (person is null)
        {
            return NotFound(ApiResponse<PersonResponse>.Fail("Person not found."));
        }

        return Ok(ApiResponse<PersonResponse>.Ok(person, "Person loaded successfully."));
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<PersonResponse>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiResponse<PersonResponse>), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiResponse<PersonResponse>>> CreatePerson(
        [FromBody] CreatePersonRequest request,
        CancellationToken cancellationToken)
    {
        var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
                .GroupBy(x => x.PropertyName)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(x => x.ErrorMessage).ToArray()
                );

            return BadRequest(ApiResponse<PersonResponse>.Fail("Validation failed.", errors));
        }

        var created = await _personService.CreateAsync(request, cancellationToken);

        return CreatedAtAction(
            nameof(GetPerson),
            new { id = created.Id },
            ApiResponse<PersonResponse>.Ok(created, "Person created successfully.")
        );
    }
}
