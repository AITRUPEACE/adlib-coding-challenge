using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<ProductFeature> ProductFeatures { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductFeature>().Property(p => p.Status).HasConversion<string>();
            modelBuilder.Entity<ProductFeature>().Property(p => p.EstimatedComplexity).HasConversion<string>();
        }
    }
}
