using Microsoft.EntityFrameworkCore;

namespace EnquiryApi.Models
{
    public class EnquiryDbContext : DbContext
    {
        public EnquiryDbContext(DbContextOptions<EnquiryDbContext> options)
            : base(options)
        {
        }

        // Example DbSet - replace or add more as needed
        public DbSet<EnquiryStatus> EnquiryStatus { get; set; }
        public DbSet<EnquiryType> EnquiryTypes { get; set; }
        public DbSet<EnquiryModel> EnquiryModels { get; set; }  
    }
}
