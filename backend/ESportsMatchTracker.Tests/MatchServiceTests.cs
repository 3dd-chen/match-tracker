using ESportsMatchTracker.API.Models;
using ESportsMatchTracker.API.Services;
using Microsoft.AspNetCore.Hosting;
using Moq;
using System.Text.Json;
using Xunit;
using Match = ESportsMatchTracker.API.Models.Match;

namespace ESportsMatchTracker.Tests;

public class MatchServiceTests : IDisposable
{
    private readonly Mock<IWebHostEnvironment> _mockEnv;
    private readonly string _tempDir;
    private readonly string _dummyFeedDir;

    public MatchServiceTests()
    {
        _mockEnv = new Mock<IWebHostEnvironment>();
        _tempDir = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
        _dummyFeedDir = Path.Combine(_tempDir, "DummyFeed");

        Directory.CreateDirectory(_dummyFeedDir);
        
        // Mock ContentRootPath to be inside the temp dir, so "..\..\DummyFeed" resolves correctly
        // We need to structure it so that ContentRootPath/../../DummyFeed points to _dummyFeedDir
        // So ContentRootPath should be _tempDir/Project/API
        var apiDir = Path.Combine(_tempDir, "Project", "API");
        Directory.CreateDirectory(apiDir);
        _mockEnv.Setup(e => e.ContentRootPath).Returns(apiDir);
    }

    public void Dispose()
    {
        if (Directory.Exists(_tempDir))
        {
            Directory.Delete(_tempDir, true);
        }
    }

    [Fact]
    public async Task GetAllMatchesAsync_ReturnsMatches_WhenFilesExist()
    {
        // Arrange
        var scheduledMatches = new List<Match>
        {
            new Match { Id = 1, Game = "LoL", Status = "Scheduled" }
        };
        await File.WriteAllTextAsync(Path.Combine(_dummyFeedDir, "matches-scheduled.json"), JsonSerializer.Serialize(scheduledMatches));

        var liveMatches = new List<Match>
        {
            new Match { Id = 2, Game = "Dota2", Status = "Live" }
        };
        await File.WriteAllTextAsync(Path.Combine(_dummyFeedDir, "matches-live.json"), JsonSerializer.Serialize(liveMatches));

        var endedMatches = new List<Match>
        {
            new Match { Id = 3, Game = "CSGO", Status = "Ended" }
        };
        await File.WriteAllTextAsync(Path.Combine(_dummyFeedDir, "matches-ended.json"), JsonSerializer.Serialize(endedMatches));

        var service = new MatchService(_mockEnv.Object);

        // Act
        var result = await service.GetAllMatchesAsync();

        // Assert
        Assert.Equal(3, result.Count);
        Assert.Contains(result, m => m.Id == 1 && m.Status == "Scheduled");
        Assert.Contains(result, m => m.Id == 2 && m.Status == "Live");
        Assert.Contains(result, m => m.Id == 3 && m.Status == "Ended");
    }

    [Fact]
    public async Task GetAllMatchesAsync_ReturnsEmptyList_WhenNoFilesExist()
    {
        // Arrange
        var service = new MatchService(_mockEnv.Object);

        // Act
        var result = await service.GetAllMatchesAsync();

        // Assert
        Assert.Empty(result);
    }
}
