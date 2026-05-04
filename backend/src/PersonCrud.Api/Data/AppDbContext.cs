using Microsoft.EntityFrameworkCore;
using PersonCrud.Api.Models;

namespace PersonCrud.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Person> People => Set<Person>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>(entity =>
        {
            entity.ToTable("people");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Id)
                .HasColumnName("id");

            entity.Property(x => x.FirstName)
                .HasColumnName("first_name")
                .HasMaxLength(120)
                .IsRequired();

            entity.Property(x => x.LastName)
                .HasColumnName("last_name")
                .HasMaxLength(120)
                .IsRequired();

            entity.Property(x => x.BirthDate)
                .HasColumnName("birth_date")
                .HasColumnType("date")
                .IsRequired();

            entity.Property(x => x.Address)
                .HasColumnName("address")
                .HasMaxLength(1000)
                .IsRequired();

            entity.Property(x => x.CreatedAt)
                .HasColumnName("created_at")
                .HasDefaultValueSql("NOW()")
                .IsRequired();

            entity.Property(x => x.UpdatedAt)
                .HasColumnName("updated_at");

            entity.HasIndex(x => x.CreatedAt)
                .HasDatabaseName("ix_people_created_at");

            entity.HasIndex(x => new { x.FirstName, x.LastName })
                .HasDatabaseName("ix_people_full_name");
        });
    }
}
