using FluentValidation;
using MediatR;
using Npgsql.Internal.TypeHandlers.LTreeHandlers;
using System.Data;

namespace TaskCRM.Behaviours;

public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{

    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        //TODO add validation

        if (!_validators.Any())
        {
            return await next();
        }

        var context = new ValidationContext<TRequest>(request);

        var validationResult = await Task.WhenAll(_validators.Select(x => x.ValidateAsync(context, cancellationToken)));

        var failures = validationResult.SelectMany(r => r.Errors).Where(f => f != null).ToList();

        if (failures.Count > 0)
        {
            throw new ValidationException(failures);
        }

        return await next();
    }
}


public class TransactionalBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
{

    private readonly ITranscationService _ranscationService;

    public TransactionalBehaviour(ITranscationService ranscationService)
    {
        _ranscationService = ranscationService;
    }


    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        _ranscationService.SetCommandTimeout(TimeSpan.FromSeconds(60));
        using var tx = _ranscationService.BeginTransaction(IsolationLevel.ReadCommitted);
        
        try
        {

            //TODO add validation
            var response = await next();

            tx.Commit();

            return response;
        }
        catch
        {
            tx.Rollback();
            throw;
        }
       
    }
}