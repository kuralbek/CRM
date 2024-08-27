using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;
using WebApplication1.data;



namespace TaskCRM.Services.Implements
{
    public class TransactionService : ITranscationService
    {
        private readonly AppDbContext _context;
        //private readonly DbContext _dbContext;

        public TransactionService(AppDbContext dbContext)
        {
            _context = dbContext;
        }

        public IDbContextTransaction BeginTransaction(IsolationLevel? isolationLevel = null)
        {
            return isolationLevel.HasValue ?
                _context.Database.BeginTransaction(isolationLevel.Value) :
                _context.Database.BeginTransaction();
        }
        public void SetCommandTimeout(TimeSpan commandTimeout)
        {
            _context.Database.SetCommandTimeout(commandTimeout);
        }

  
    }
}
