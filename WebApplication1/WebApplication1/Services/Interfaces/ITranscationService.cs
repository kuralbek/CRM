

using Microsoft.EntityFrameworkCore.Storage;
using System.Data;


public interface ITranscationService
{
    IDbContextTransaction BeginTransaction(IsolationLevel? isolationLevel = null);
    void SetCommandTimeout(TimeSpan commandTimeout);
}

