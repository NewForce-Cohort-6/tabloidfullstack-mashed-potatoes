using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepo;



        public PostTagController(IPostTagRepository postTagRepository)
        {
            _postTagRepo = postTagRepository;

        }

        // GET: api/<PostTagController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postTagRepo.GetAllPostTags());
        }

        // GET api/<PostTagController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var postTag = _postTagRepo.GetPostTagById(id);
            if (postTag == null)
            {
                return NotFound();
            }
            return Ok(postTag);
        }
    }

        // POST api/<PostTagController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT api/<PostTagController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<PostTagController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    
}
