using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using ESportsMatchTracker.API.Services;
using ESportsMatchTracker.API.Data;
using ESportsMatchTracker.API.Models;

namespace ESportsMatchTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MatchController : ControllerBase
{
    private readonly IMatchService _matchService;
    private readonly IMemoryCache _cache;
    private readonly AppDbContext _dbContext;
    private const string CacheKey = "matches";

    public MatchController(IMatchService matchService, IMemoryCache cache, AppDbContext dbContext)
    {
        _matchService = matchService;
        _cache = cache;
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Match>>> GetMatches()
    {
        // Try to get from cache
        if (_cache.TryGetValue(CacheKey, out List<Match>? cachedMatches))
        {
            await LogApiCall("/api/match", 200);
            return Ok(cachedMatches);
        }

        // Fetch from service
        var matches = await _matchService.GetAllMatchesAsync();

        // Cache for 5 minutes
        var cacheOptions = new MemoryCacheEntryOptions()
            .SetAbsoluteExpiration(TimeSpan.FromMinutes(5));

        _cache.Set(CacheKey, matches, cacheOptions);

        // Log the API call
        await LogApiCall("/api/match", 200);

        return Ok(matches);
    }

    private async Task LogApiCall(string endpoint, int statusCode)
    {
        var log = new ApiCallLog
        {
            Timestamp = DateTime.UtcNow,
            Endpoint = endpoint,
            StatusCode = statusCode
        };

        _dbContext.ApiCallLogs.Add(log);
        await _dbContext.SaveChangesAsync();
    }
}
