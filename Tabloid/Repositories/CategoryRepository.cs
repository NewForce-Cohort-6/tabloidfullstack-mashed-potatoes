using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Extensions.Hosting;
using Tabloid.Repositories;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;

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
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id,[Name]
                FROM Category
                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    Category category = null;
                    while (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                        };
                    }

                    reader.Close();

                    return category;
                }
            }
        }
        public void Add(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Category (Name)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", category.Name);
                    
                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Category
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Category category)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Category
                            SET Name = @name
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", category.Name);
                    cmd.Parameters.AddWithValue("@id", category.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
