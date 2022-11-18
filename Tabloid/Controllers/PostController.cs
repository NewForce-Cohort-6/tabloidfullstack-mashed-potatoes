using System;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;

namespace Tabloid
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{
        //    var post = _postRepository.GetById(id);
        //    if (post == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(post);
        //}

        //[HttpGet("GetWithComments")]
        //public IActionResult GetWithComments()
        //{
        //    var posts = _postRepository.GetAllWithComments();
        //    return Ok(posts);
        //}

        //[HttpGet("GetByIdWithComments")]
        //public IActionResult GetByIdWithComments(int id)
        //{
        //    var posts = _postRepository.GetPostByIdWithComments(id);
        //    return Ok(posts);
        //}

        //[HttpGet("GetUserPostsById")]
        //public IActionResult GetUserPostsById(int id)
        //{
        //    var posts = _postRepository.GetUserPostsById(id);
        //    return Ok(posts);
        //}

        //[HttpPost]
        //public IActionResult Post(Post post)
        //{
        //    post.DateCreated = DateTime.Now;
        //    _postRepository.Add(post);
        //    return CreatedAtAction("Get", new { id = post.Id }, post);
        //}

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, Post post)
        //{
        //    if (id != post.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _postRepository.Update(post);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _postRepository.Delete(id);
        //    return NoContent();
        //}

        //[HttpGet("search")]
        //public IActionResult Search(string q, bool sortDesc)
        //{
        //    return Ok(_postRepository.Search(q, sortDesc));
        //}        
    }
}
