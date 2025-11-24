namespace ESportsMatchTracker.API.Models;

public class MatchDetails
{
    public string Format { get; set; } = string.Empty;
    public List<string> MapPool { get; set; } = new();
}
