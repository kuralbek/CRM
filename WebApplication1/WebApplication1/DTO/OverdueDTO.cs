namespace WebApplication1.DTO
{
    public class OverdueDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; }
        public string StartDate { get; set; }
        public string DueDate { get; set; }
        public int CompletionPercentage { get; set; }
        public int DaysOverdue { get; set; }
    }
}
