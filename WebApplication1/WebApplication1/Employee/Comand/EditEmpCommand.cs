using MediatR;
using TaskCRM.DTO;
using WebApplication1.DTO;

namespace TaskCRM.Employee.Comand
{
    public class EditEmpCommand:IRequest<ResponsDTO>
    {
        public int Id { get; set; }

        public EmpEditDTO empEditDTO { get; set; }
    }
}
