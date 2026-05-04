namespace PersonCrud.Api.Common;

public static class AgeCalculator
{
    public static int Calculate(DateOnly birthDate)
    {
        var today = DateOnly.FromDateTime(DateTime.Today);
        var age = today.Year - birthDate.Year;

        if (birthDate > today.AddYears(-age))
        {
            age--;
        }

        return Math.Max(age, 0);
    }
}
