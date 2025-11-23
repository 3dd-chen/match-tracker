using ESportsMatchTracker.API;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Moq;
using Xunit;
using Match = ESportsMatchTracker.API.Match;

namespace ESportsMatchTracker.Tests;

public class MatchControllerTests
{
    private readonly Mock<IMatchService> _mockMatchService;
    private readonly IMemoryCache _cache;
    private readonly AppDbContext _dbContext;
    private readonly MatchController _controller;

    public MatchControllerTests()
    {
        _mockMatchService = new Mock<IMatchService>();
        _cache = new MemoryCache(new MemoryCacheOptions());
        
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _dbContext = new AppDbContext(options);

        _controller = new MatchController(_mockMatchService.Object, _cache, _dbContext);
    }

    [Fact]
    public async Task GetMatches_ReturnsCachedMatches_WhenCacheExists()
    {
        // Arrange
        var cachedMatches = new List<Match> { new Match { Id = 1, Game = "Cached" } };
        _cache.Set("matches", cachedMatches);

        // Act
        var result = await _controller.GetMatches();

        // Assert
        var actionResult = Assert.IsType<ActionResult<List<Match>>>(result);
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var returnValue = Assert.IsType<List<Match>>(okResult.Value);
        Assert.Single(returnValue);
        Assert.Equal("Cached", returnValue[0].Game);
        
        // Verify service was NOT called
        _mockMatchService.Verify(s => s.GetAllMatchesAsync(), Times.Never);
        
        // Verify log was added
        Assert.Equal(1, await _dbContext.ApiCallLogs.CountAsync());
    }

    [Fact]
    public async Task GetMatches_ReturnsMatchesFromService_WhenCacheMiss()
    {
        // Arrange
        var serviceMatches = new List<Match> { new Match { Id = 2, Game = "Service" } };
        _mockMatchService.Setup(s => s.GetAllMatchesAsync()).ReturnsAsync(serviceMatches);

        // Act
        var result = await _controller.GetMatches();

        // Assert
        var actionResult = Assert.IsType<ActionResult<List<Match>>>(result);
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var returnValue = Assert.IsType<List<Match>>(okResult.Value);
        Assert.Single(returnValue);
        Assert.Equal("Service", returnValue[0].Game);

        // Verify service WAS called
        _mockMatchService.Verify(s => s.GetAllMatchesAsync(), Times.Once);

        // Verify cache was set
        Assert.True(_cache.TryGetValue("matches", out List<Match>? cached));
        Assert.NotNull(cached);
        Assert.Equal("Service", cached[0].Game);
        
        // Verify log was added
        Assert.Equal(1, await _dbContext.ApiCallLogs.CountAsync());
    }
}
