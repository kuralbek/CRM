namespace WebApplication1.DTO
{
    public class CreateTaskDTO
    {
        public string Title { get; set; }
        public int EmployeeId { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int CompletionPercentage { get; set; }
    }
}
