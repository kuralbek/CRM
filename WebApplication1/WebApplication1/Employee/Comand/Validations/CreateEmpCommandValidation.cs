using FluentValidation;

namespace TaskCRM.Employee.Comand.Validations
{
    public class CreateEmpCommandValidation:AbstractValidator<CreateEmpCommand>
    {
        public CreateEmpCommandValidation() 
        {
            RuleFor(x => x.Emp.FullName).NotEmpty().WithMessage("Full Name is required.")
            .Matches("^[a-zA-Z]+$").WithMessage("Full Name must contain only letters.");
            RuleFor(x => x.Emp.Position).NotEmpty().WithMessage("Не должен быть путсым");
            RuleFor(x => x.Emp.password).NotEmpty().Matches("^[0-9]+$").WithMessage("Password must contain only digits.");
        }
    }
}
