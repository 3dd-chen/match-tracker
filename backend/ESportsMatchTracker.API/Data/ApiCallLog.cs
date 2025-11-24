namespace ESportsMatchTracker.API.Data;

public class ApiCallLog
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }
    public string Endpoint { get; set; } = string.Empty;
    public int StatusCode { get; set; }
}
