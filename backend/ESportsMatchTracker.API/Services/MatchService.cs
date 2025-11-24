using System.Text.Json;
using ESportsMatchTracker.API.Models;

namespace ESportsMatchTracker.API.Services;

public class MatchService : IMatchService
{
    private readonly string _dummyFeedPath;

    public MatchService(IWebHostEnvironment env)
    {
        // DummyFeed is at the root of the solution, go up from API project
        _dummyFeedPath = Path.Combine(env.ContentRootPath, "..", "..", "DummyFeed");
    }

    public async Task<List<Match>> GetAllMatchesAsync()
    {
        var allMatches = new List<Match>();

        // Read scheduled matches
        var scheduledPath = Path.Combine(_dummyFeedPath, "matches-scheduled.json");
        if (File.Exists(scheduledPath))
        {
            var scheduledJson = await File.ReadAllTextAsync(scheduledPath);
            var scheduled = JsonSerializer.Deserialize<List<Match>>(scheduledJson, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if (scheduled != null)
                allMatches.AddRange(scheduled);
        }

        // Read live matches
        var livePath = Path.Combine(_dummyFeedPath, "matches-live.json");
        if (File.Exists(livePath))
        {
            var liveJson = await File.ReadAllTextAsync(livePath);
            var live = JsonSerializer.Deserialize<List<Match>>(liveJson, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if (live != null)
                allMatches.AddRange(live);
        }

        // Read ended matches
        var endedPath = Path.Combine(_dummyFeedPath, "matches-ended.json");
        if (File.Exists(endedPath))
        {
            var endedJson = await File.ReadAllTextAsync(endedPath);
            var ended = JsonSerializer.Deserialize<List<Match>>(endedJson, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if (ended != null)
                allMatches.AddRange(ended);
        }

        return allMatches;
    }
}
