﻿using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Extensions.Hosting;
using Tabloid.Repositories;
using System.Reflection.PortableExecutable;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {

        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id,[Name]
                FROM Category
                ORDER BY [Name]";

                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();
                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return categories;
                }
            }
        }
        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id,[Name]
                FROM Category
                ORDER BY [Name]";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Category category = null;
                    while (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return category;
                }
            }
        }
    }
}