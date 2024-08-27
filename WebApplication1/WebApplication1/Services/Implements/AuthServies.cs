using System.Text;
using WebApplication1.data;
using WebApplication1.Services.Interface;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
namespace WebApplication1.Services.Implements
{
    public class AuthServies : IAuthService
    {
        private readonly AppDbContext _context;

        public AuthServies(AppDbContext context)
        {

            _context = context; 
        }
        public bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }

        public string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        public async Task<bool> VerifyPasswordAsync(string username, string password)
        {
            var employee = await _context.Employees.SingleOrDefaultAsync(e => e.FullName == username);

            if (employee == null)
            {
                return false; // User not found
            }
            var pass = HashPassword(password);
            return employee.Password == pass;
        }
    }
}
