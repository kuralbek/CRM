using MediatR;
using TaskCRM.DTO;
using WebApplication1.DTO;

namespace TaskCRM.Employee.Quries
{
    public class GetEmpQueries:IRequest<SendWrapData<EmpGetDTO>>
    {
        public string fullName { get; set; } = "";
        public int take {  get; set; }

        public int skip { get; set; }
    }
}
