
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using WebApplication1.Models;

namespace WebApplication1.data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;
       

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(Configuration.GetConnectionString("WebApiDatebase"));
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Tasks> Tasks { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Employee>(e =>
            {
                e.HasKey(e => e.Id);
                e.Property(e => e.FullName).IsRequired().HasMaxLength(100);
                e.Property(e => e.Position).IsRequired().HasMaxLength(50);
                e.Property(e => e.Password).IsRequired();

                e.HasMany(e => e.Tasks)
               .WithOne(testc => testc.Employee)
               .HasForeignKey(e => e.EmployeeId)
               .OnDelete(DeleteBehavior.Cascade);

            });

            modelBuilder.Entity<Tasks>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Title).IsRequired().HasMaxLength(100);
                entity.Property(t => t.Description).HasMaxLength(500);
                entity.Property(t => t.StartDate).IsRequired();
                entity.Property(t => t.DueDate).IsRequired();
                entity.Property(t => t.CompletionPercentage).IsRequired();

               
            });

            modelBuilder.Entity<Employee>().HasData(new Employee
            {
                Id = 1,
                FullName = "admin",
                Position = "Администратор",
                Password = HashPassword("123") // Хэширование пароля
            });
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
