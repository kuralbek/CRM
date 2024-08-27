using MediatR;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.EntityFrameworkCore;
using TaskCRM.DTO;
using WebApplication1.data;
using WebApplication1.DTO;

namespace TaskCRM.Employee.Quries
{
    public class GetEmpQueriesHandler: IRequestHandler<GetEmpQueries, SendWrapData<EmpGetDTO>>
    {

        private readonly AppDbContext _context;

        public GetEmpQueriesHandler(AppDbContext appDbContext)
        {
            this._context = appDbContext;
        }


        public async Task<SendWrapData<EmpGetDTO>> Handle(GetEmpQueries req,CancellationToken cancellationToken)
        {

            var query = _context.Employees.AsQueryable();

            if (req.fullName != "1")
            {
                Console.WriteLine($"The value of fullName is: {req.fullName}");
                query = query.Where(e => e.FullName.Contains(req.fullName));
            }


            var result = await query
                .Where(e => e.Id != 1)
                .GroupJoin(
                    _context.Tasks,
                    e => e.Id,
                    t => t.EmployeeId,
                    (e, ts) => new
                    {
                        Employee = e,
                        Tasks = ts
                    }
                )
                .SelectMany(
                    ets => ets.Tasks.DefaultIfEmpty(),
                    (e, t) => new { e.Employee, Task = t }
                )
                .GroupBy(et => new { et.Employee.Id, et.Employee.FullName, et.Employee.Position })
                .Skip((req.skip - 1) * req.take).Take(req.take)
                .Select(g => new EmpGetDTO
                {
                    Id = g.Key.Id,
                    FullName = g.Key.FullName,
                    Position = g.Key.Position,
                    TaskCount = g.Count(et => et.Task != null && et.Task.DueDate >= DateTime.UtcNow),
                    CompletionPercentage = g.Where(et => et.Task != null && et.Task.DueDate >= DateTime.UtcNow).Average(et => (double?)et.Task!.CompletionPercentage) ?? 0
                })
                .ToListAsync();


            return new SendWrapData<EmpGetDTO>
            {
                Status = true,
                Error = null,
                Total = result.Count,
                Records = result
            };

            
        }
    }
}
