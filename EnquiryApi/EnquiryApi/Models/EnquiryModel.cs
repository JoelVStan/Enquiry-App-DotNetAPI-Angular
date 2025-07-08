using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnquiryApi.Models
{
    [Table("Enquiry")]
    public class EnquiryModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EnquiryId { get; set; }

        public int EnquiryTypeId { get; set; }
        [ForeignKey("EnquiryTypeId")]
        public EnquiryType? EnquiryType { get; set; }

        public int EnquiryStatusId { get; set; }
        [ForeignKey("EnquiryStatusId")]
        public EnquiryStatus? EnquiryStatus { get; set; }

        [Required]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        public string MobileNo { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedDate { get; set; }

        public string Resolution { get; set; } = string.Empty;
    }
}
