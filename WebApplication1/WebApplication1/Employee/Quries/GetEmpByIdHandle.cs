using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskCRM.DTO;
using TaskCRM.Employee.Quries;
using WebApplication1.data;
using WebApplication1.DTO;


public class GetEmpByIdHandle : IRequestHandler<GetEmpByIdQuery, SendWrapData<EmpDTOClass>>
{
    private readonly AppDbContext _context;

    public GetEmpByIdHandle(AppDbContext context)
    {
        _context = context;
    }

    public async Task<SendWrapData<EmpDTOClass>> Handle(GetEmpByIdQuery req, CancellationToken cancellationToken)
    {

        var emp = await _context.Employees
            .Where(t => t.Id == req.Id)
            .Select(t => new EmpDTOClass
            {
                FullName = t.FullName,
                Position = t.Position
            }).ToListAsync();


        /*if (emp == null || !emp.Any())
        {
            return NotFound();
        }*/

        return new SendWrapData<EmpDTOClass>
        {
            Status = true,
            Error = null,
            Total = emp.Count,
            Records = emp
        };
    }

        
}

