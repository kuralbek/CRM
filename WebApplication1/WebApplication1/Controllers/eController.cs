using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.data;
using WebApplication1.DTO;
using WebApplication1.Models;
namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class eController : Controller
    {

        private AppDbContext _context;
       // private readonly IPasswordHasher<Employee> _passwordHasher;

        public eController(AppDbContext context)
        {
            _context = context;
           
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees(string fullName)
        {
            var query = _context.Employees.AsQueryable();
 

            if (fullName != "1")
            {
                Console.WriteLine($"The value of fullName is: {fullName}");
                query = query.Where(e => e.FullName.Contains(fullName));
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
                .Select(g => new EmpGetDTO
                {
                    Id = g.Key.Id,
                    FullName = g.Key.FullName,
                    Position = g.Key.Position,
                    TaskCount = g.Count(et => et.Task != null && et.Task.DueDate >= DateTime.UtcNow),
                    CompletionPercentage = g.Where(et => et.Task != null && et.Task.DueDate >= DateTime.UtcNow).Average(et => (double?)et.Task.CompletionPercentage)  ?? 0
                })
                .ToListAsync();

            return Ok(result);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmpDTOClass>> GetEmployee(int id)
        {

            var emp = await _context.Employees
                .Where(t => t.Id == id)
                .Select(t => new EmpDTOClass
                {
                    FullName = t.FullName,
                    Position = t.Position
                })
                .ToListAsync();

            if (emp == null || !emp.Any())
            {
                return NotFound();
            }

            return Ok(emp);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(CreateEmpDTO employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }

            var emp = new Employee
            {
                FullName = employee.FullName,
                Position = employee.Position,
                Password = HashPassword("123")
            };

            //emp.Password = _passwordHasher.HashPassword(emp, emp.Password);

            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = emp.Id }, employee);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EmpEditDTO employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }
 
            var emp = await _context.Employees.FindAsync(id);

            emp.FullName = employee.FullName;
            emp.Position = employee.Position;
            emp.Password = HashPassword(employee.Password);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO login)
        {
            if (await VerifyPasswordAsync(login.FullName, login.Password))
            {
                return Ok(new { Message = "Login successful" });
            }
            else
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }
        }

        private async Task<bool> VerifyPasswordAsync(string fullName, string enteredPassword)
        {
            var employee = await _context.Employees.SingleOrDefaultAsync(e => e.FullName == fullName);

            if (employee == null)
            {
                return false; // User not found
            }
            return employee.Password == HashPassword(enteredPassword);
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

    }
}
