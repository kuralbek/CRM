using FluentValidation;
using MediatR;
using TaskCRM.DTO;
using WebApplication1.data;
using WebApplication1.Services.Interface;

namespace TaskCRM.Employee.Comand
{
    public class EditEmpCommandHandler:IRequestHandler<EditEmpCommand,ResponsDTO>
    {
        private readonly AppDbContext _context;
        private readonly IAuthService _authServices;

        public EditEmpCommandHandler(AppDbContext context, IAuthService authServices)
        {
            _context = context;
            _authServices = authServices;
        }

        public async Task<ResponsDTO> Handle(EditEmpCommand req,CancellationToken cancellationToken)
        {
          
            var emp = await _context.Employees.FindAsync(req.Id);

            emp!.FullName = req.empEditDTO.FullName;
            emp.Position = req.empEditDTO.Position;
            emp.Password = _authServices.HashPassword(req.empEditDTO.Password);

            await _context.SaveChangesAsync(cancellationToken);

            var res = new ResponsDTO { IsSuccess = true, Message = "Success" };
            
            return res;

        }
    }
}
