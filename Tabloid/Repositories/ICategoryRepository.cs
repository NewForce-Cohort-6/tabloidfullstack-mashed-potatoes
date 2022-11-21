using Tabloid.Models;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {


        List<Category> GetAllCategories();
        Category GetById(int id);

        //void Add(Post post);
        //void Delete(int id);
        //void Update(Post post);
    }
}