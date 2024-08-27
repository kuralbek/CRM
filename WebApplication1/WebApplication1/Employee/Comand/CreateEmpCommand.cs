using MediatR;
using WebApplication1.DTO;
using WebApplication1.Models;


public class CreateEmpCommand:IRequest<Employee>
{
    public CreateEmpDTO Emp {  get; set; } = new CreateEmpDTO();
}

