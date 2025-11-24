using ESportsMatchTracker.API.Models;

namespace ESportsMatchTracker.API.Services;

public interface IMatchService
{
    Task<List<Match>> GetAllMatchesAsync();
}
