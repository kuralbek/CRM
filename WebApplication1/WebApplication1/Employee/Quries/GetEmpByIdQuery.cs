using MediatR;
using TaskCRM.DTO;
using WebApplication1.DTO;

namespace TaskCRM.Employee.Quries
{
    public class GetEmpByIdQuery: IRequest<SendWrapData<EmpDTOClass>>
    {
        public int Id { get; set; }
    }
}
