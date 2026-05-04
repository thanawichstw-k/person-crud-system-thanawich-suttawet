using FluentValidation;
using PersonCrud.Api.Dtos;

namespace PersonCrud.Api.Validators;

public class CreatePersonRequestValidator : AbstractValidator<CreatePersonRequest>
{
    public CreatePersonRequestValidator()
    {
        RuleFor(x => x.FirstName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("First name is required.")
            .MaximumLength(120).WithMessage("First name must not exceed 120 characters.");

        RuleFor(x => x.LastName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Last name is required.")
            .MaximumLength(120).WithMessage("Last name must not exceed 120 characters.");

        RuleFor(x => x.BirthDate)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Birth date is required.")
            .Must(date => date <= DateOnly.FromDateTime(DateTime.Today))
            .WithMessage("Birth date cannot be in the future.");

        RuleFor(x => x.Address)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Address is required.")
            .MaximumLength(1000).WithMessage("Address must not exceed 1000 characters.");
    }
}
