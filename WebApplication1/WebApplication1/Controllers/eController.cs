using MediatR;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

using TaskCRM.Employee.Comand;
using TaskCRM.Employee.Quries;
using WebApplication1.data;
using WebApplication1.DTO;
using WebApplication1.Models;
using WebApplication1.Services.Interface;
namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class eController : Controller
    {

        private AppDbContext _context;
        private readonly IAuthService _authServices;
        private readonly IAntiforgery _antiforgery;
        private readonly IMediator _mediator;
        public eController(AppDbContext context, IAuthService authService, IAntiforgery antiforgery,IMediator mediator)
        {
            _context = context;
            _authServices = authService;
            _antiforgery = antiforgery;
            _mediator = mediator;

        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees(string fullName,int take,int skip)
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            var query = new GetEmpQueries { fullName = fullName, take = take, skip = skip };
            var result = await _mediator.Send(query);


            result.AntiForgeryToken = tokens.RequestToken;

            return Ok(result);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmpDTOClass>> GetEmployee(int id)
        {

            var query = new GetEmpByIdQuery { Id = id };

            var res = await _mediator.Send(query);

            /*var emp = await _context.Employees
                .Where(t => t.Id == id)
                .Select(t => new EmpDTOClass
                {
                    FullName = t.FullName,
                    Position = t.Position
                })
                .ToListAsync();*/

           /* if (emp == null || !emp.Any())
            {
                return NotFound();
            }*/

            return Ok(res);
        }

        [HttpPost]
        [Route("[action]")]
        [ValidateAntiForgeryToken]
        [Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> CreateEmployee([FromForm] CreateEmpDTO employee)
        {
            try
            {
                var comand = new CreateEmpCommand { Emp = employee };

                var reslut = await _mediator.Send(comand);

                return Ok(reslut);
            }
            catch (OperationCanceledException ex)
            {
                return StatusCode(499, $"Client closed request {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, $"Error.{ex.Message}");

            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EmpEditDTO employee)
        {

            try
            {
                var command = new EditEmpCommand { Id = id, empEditDTO = employee };

                var result = await _mediator.Send(command);

                return Ok(result);
            }
            catch (ValidationException ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }

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
            if (await _authServices.VerifyPasswordAsync(login.FullName, login.Password))
            {
                return Ok(new { Message = "Login successful" });
            }
            else
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }
        }

       

    }
}
