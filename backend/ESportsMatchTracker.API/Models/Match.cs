namespace ESportsMatchTracker.API.Models;

public class Match
{
    public int Id { get; set; }
    public string Game { get; set; } = string.Empty;
    public List<string> Teams { get; set; } = new();
    public DateTime StartTime { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Stage { get; set; } = string.Empty;
    public string Tournament { get; set; } = string.Empty;
    public string StreamUrl { get; set; } = string.Empty;
    public MatchDetails? MatchDetails { get; set; }
    
    // For live and ended matches
    public Dictionary<string, int>? Score { get; set; }
    public List<MapScore>? MapScores { get; set; }
    
    // For live matches
    public string? CurrentMap { get; set; }
    
    // For ended matches
    public string? Winner { get; set; }
}
