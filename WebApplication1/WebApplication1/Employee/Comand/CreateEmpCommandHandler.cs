using FluentValidation;
using MediatR;
using WebApplication1.data;
using WebApplication1.Models;
using WebApplication1.Services.Interface;


public class CreateEmpCommandHandler:IRequestHandler<CreateEmpCommand,Employee>
{
    private readonly IAuthService _authServices;
    private readonly AppDbContext _context;


    public CreateEmpCommandHandler(IAuthService authServices, AppDbContext context)
    {
        _authServices = authServices;
        _context = context;
    }

    public async Task<Employee> Handle(CreateEmpCommand command,CancellationToken cancellationToken)
    {

        var emp = new Employee
        {
            FullName = command.Emp.FullName,
            Position = command.Emp.Position,
            Password = _authServices.HashPassword(command.Emp.password),
        };

        _context.Add(emp);

        await _context.SaveChangesAsync(cancellationToken);

        return emp;

    }
}

