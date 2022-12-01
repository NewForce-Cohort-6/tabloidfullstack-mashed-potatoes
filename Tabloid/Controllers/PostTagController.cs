using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using System.Security.Claims;
using Tabloid.Repositories;
using Tabloid.Models;
using System;
using System.Collections.Generic;

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


        //POST api/<PostTagController>
        [HttpPost]
        public IActionResult Add(PostTag postTag)
        {
            _postTagRepo.Add(postTag);
            return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }

        //PUT api/<PostTagController>/5
        //[HttpPut("{id}")]
        //public IActionResult Update(int id, PostTag postTag)
        //{
        //    _postTagRepo.Update(postTag);
        //    return Ok(postTag);
        //}

        // DELETE api/<PostTagController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
