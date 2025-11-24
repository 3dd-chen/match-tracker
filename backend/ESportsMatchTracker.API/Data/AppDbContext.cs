using Microsoft.EntityFrameworkCore;

namespace ESportsMatchTracker.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<ApiCallLog> ApiCallLogs { get; set; }
}
