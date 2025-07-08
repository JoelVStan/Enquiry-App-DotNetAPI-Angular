using EnquiryApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EnquiryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("allowCors")]
    public class EnquiryMaster : ControllerBase
    {
        private readonly EnquiryDbContext _context;
        public EnquiryMaster(EnquiryDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllStatus")]
        public List<EnquiryStatus> GetEnquiryStatus()
        {
            return _context.EnquiryStatus.ToList();
        }
        [HttpGet("GetAllTypes")]
        public List<EnquiryType> GetEnquiryTypes()
        {
            return _context.EnquiryTypes.ToList();
        }
        [HttpGet("GetAllEnquiries")]
        public async Task<IActionResult> GetAllEnquiries()
        {
            var enquiries = await _context.EnquiryModels
                .Include(e => e.EnquiryType)
                .Include(e => e.EnquiryStatus)
                .ToListAsync();

            return Ok(enquiries);
        }

        [HttpPost("CreateNewEnquiry")]
        public EnquiryModel AddNewEnquiry(EnquiryModel enquiry)
        {
            enquiry.CreatedDate = DateTime.Now;
            _context.EnquiryModels.Add(enquiry);
            _context.SaveChanges();
            return enquiry;
        }
        [HttpPut("UpdateEnquiry")]  
        public ActionResult<EnquiryModel> UpdateEnquiry(EnquiryModel enquiry)
        {
            var existingEnquiry = _context.EnquiryModels.Find(enquiry.EnquiryId);
            if (existingEnquiry == null)
            {
                return NotFound();
            }

            existingEnquiry.EnquiryStatusId = enquiry.EnquiryStatusId;
            existingEnquiry.EnquiryTypeId = enquiry.EnquiryTypeId;
            existingEnquiry.CustomerName = enquiry.CustomerName;
            existingEnquiry.MobileNo = enquiry.MobileNo;
            existingEnquiry.Email = enquiry.Email;
            existingEnquiry.Message = enquiry.Message;
            existingEnquiry.Resolution = enquiry.Resolution;
            _context.SaveChanges();

            return Ok(existingEnquiry);
        }
        [HttpDelete("DeleteEnquiryById/{id}")]
        public ActionResult<bool> DeleteEnquiry([FromRoute] int id)
        {
            var enquiry = _context.EnquiryModels.Find(id);
            if (enquiry == null)
            {
                return NotFound(false);
            }

            _context.EnquiryModels.Remove(enquiry);
            _context.SaveChanges();
            return Ok(true);
        }

        [HttpGet("GetEnquiryById/{id}")]
        public async Task<IActionResult> GetEnquiryById(int id)
        {
            var enquiry = await _context.EnquiryModels
                .Include(e => e.EnquiryType)
                .Include(e => e.EnquiryStatus)
                .FirstOrDefaultAsync(e => e.EnquiryId == id);

            if (enquiry == null)
                return NotFound();

            return Ok(enquiry);
        }

    }
}
