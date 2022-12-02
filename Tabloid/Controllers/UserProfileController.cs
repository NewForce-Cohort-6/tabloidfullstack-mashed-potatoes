using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        //private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserRepository _userRepository;
        private readonly IWebHostEnvironment _hostEnvironment;
        public UserProfileController( IUserRepository userRepository, IWebHostEnvironment hostEnvironment)
        {
            //_userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

                if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userRepository.Add(userProfile);
            return CreatedAtAction(
                "GetByEmail",
                new { email = userProfile.Email },
                userProfile);
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserProfile>> Put(int id, UserProfile userProfile)
            //if the second argument of this method has [FromForm] - do all of the properties of userProfile have to be in a FormData object?
            //if so, should I unpack them into a regular object here to send to the update method on line 79?
            //error is 404 Bad Request rn
        {
            //using var stream = new MemoryStream(userProfile.ImageFile.ReadAllBytes(userProfile.ImageFile).ToArray());
            //var formFile = new FormFile(stream, 0, stream.Length, "streamFile", file.Split(@"\").Last());
            //userProfile.ImageLocation = await SaveImage(userProfile.ImageFile);
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(userProfile);
            return NoContent();
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ","-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "images", imageName);

            using(var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }

    }
}
