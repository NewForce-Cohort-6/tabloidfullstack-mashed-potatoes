using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.Extensions.Hosting;


namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAllCategories());
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public IActionResult Category(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, Category category)
        {
            _categoryRepository.Update(category);
            return Ok(category);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }
    }
}
