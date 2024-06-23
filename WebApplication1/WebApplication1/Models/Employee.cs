using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
        public string Password { get; set; }

        public ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();

    }
}
