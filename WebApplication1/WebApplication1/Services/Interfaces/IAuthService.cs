namespace WebApplication1.Services.Interface
{
    public interface IAuthService
    {
        Task<bool> VerifyPasswordAsync(string username, string password);
        bool EmployeeExists(int id);

        string HashPassword(string password);
    }
}
