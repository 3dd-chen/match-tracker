namespace ESportsMatchTracker.API.Models;

public class MapScore
{
    public string Map { get; set; } = string.Empty;
    public Dictionary<string, int> Score { get; set; } = new();
}
