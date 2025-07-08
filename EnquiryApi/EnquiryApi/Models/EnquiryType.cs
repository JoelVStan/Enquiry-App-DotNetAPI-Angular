using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnquiryApi.Models
{
    [Table("EnquiryType")]
    public class EnquiryType
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int typeId { get; set; }
        [Required]
        public string typename { get; set; } = string.Empty;
    }
}
