
namespace TaskCRM.DTO
{
    public class SendWrapData<T>
    {
        public bool Status { get; set; }
        public string? Error { get; set; }
        public int Total { get; set; }
        public List<T> Records { get; set; } = new();

        public string? AntiForgeryToken { get; set; }
    }
}
