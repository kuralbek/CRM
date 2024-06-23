namespace WebApplication1.DTO
{
    public class EditTaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int CompletionPercentage { get; set; }
    }
}
