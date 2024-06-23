using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.data;
using WebApplication1.DTO;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : Controller
    {

        private AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<CreateTaskDTO>> CreateTask(CreateTaskDTO task)
        {
           // var currentDate = DateTime.UtcNow;
            if (task == null)
            {
                return BadRequest();
            }

            var dueDateUtc = DateTime.SpecifyKind(task.DueDate, DateTimeKind.Utc);


            var ts = new Tasks
            {
                Title = task.Title,
                Description = task.Description,
                EmployeeId = task.EmployeeId,
                DueDate = dueDateUtc,
            };

            _context.Tasks.Add(ts);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var ts = await _context.Tasks.FindAsync(id);
            if (ts == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(ts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EditTaskDTO task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            var ts = await _context.Tasks.FindAsync(id);

            ts.Title = task.Title;
            ts.Description = task.Description;
            ts.DueDate = task.DueDate;
            ts.CompletionPercentage = task.CompletionPercentage;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!TaskExists(id))
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

        [HttpGet("getTask/{id}")]
        public async Task<ActionResult<EditTaskDTO>> GetTask(int id)
        {

            // return Ok();

            var ts = await _context.Tasks
                .Where(t => t.Id == id)
                .Select(t => new EditTaskDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    CompletionPercentage = t.CompletionPercentage,

                })
                .ToListAsync();

            if (ts == null || !ts.Any())
            {
                return NotFound();
            }

            return Ok(ts);
        }

        [HttpGet("{employeeId}")]
        public async Task<ActionResult<IEnumerable<TasksDTOClass>>> GetTasksForEmployee(int employeeId)
        {
            var tasks = await _context.Tasks
                .Where(t => t.EmployeeId == employeeId)
                .Select(t => new TasksDTOClass
                {   
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    StartDate = t.StartDate.ToString("dd-MM-yyyy"),
                    DueDate = t.DueDate.ToString("dd-MM-yyyy"),
                    CompletionPercentage = t.CompletionPercentage 
                })
                .ToListAsync();

            if (tasks == null || !tasks.Any())
            {
                return Ok(tasks);
            }

            return Ok(tasks);
        }

        [HttpGet("overdueTasks")]
        public async Task<ActionResult<IEnumerable<OverdueDTO>>> GetOverdueTasks()
        {
            var currentDate = DateTime.UtcNow;

            var overdueTasks = await _context.Tasks
                .Where(t => t.DueDate < currentDate && t.CompletionPercentage < 100)
                .Select(t => new OverdueDTO
                {
                    Id = t.Id,
                    FullName = t.Employee.FullName,
                    Title = t.Title,
                    StartDate = t.StartDate.ToString("dd-MM-yyyy"),
                    DueDate = t.DueDate.ToString("dd-MM-yyyy"),
                    CompletionPercentage = t.CompletionPercentage,
                    DaysOverdue =  (currentDate - t.DueDate).Days
                })
                .ToListAsync();

           /* if (overdueTasks == null || !overdueTasks.Any())
            {
                return NotFound();
            }*/

            return Ok(overdueTasks);
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
