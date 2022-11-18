using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime,
                                            p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId,

                                            c.name as CategoryName, u.DisplayName
                                        FROM Post p
                                        join category c on p.categoryId = c.id
                                        join userProfile u on p.userProfileId = u.id
                                        where p.IsApproved = 1 and p.publishDateTime < @now
                                        order by p.publishDateTime desc;";

                    cmd.Parameters.AddWithValue("now", DateTime.Now);
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Post> posts = new List<Post>();
                    while (reader.Read())
                    {
                        Post post = new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("Content")),
                            PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            UserProfile = new UserProfile(),
                            Category = new Category()
                        };
                        post.UserProfile.DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"));
                        post.Category.Name = reader.GetString(reader.GetOrdinal("CategoryName"));

                        posts.Add(post);
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        //public Post Get(int id)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT p.id,
        //                                       p.Title As PostTitle,
        //                                       p.URL AS PostUrl,
        //                                       p.PublishDateTime,
        //                                       p.AuthorId,
        //                                       p.BlogId,
        //                                       t.Id as TagId,
        //                                       t.Name,
        //                                       a.FirstName,
        //                                       a.LastName,
        //                                       a.Bio,
        //                                       b.Title AS BlogTitle,
        //                                       b.URL AS BlogUrl
        //                                  FROM Post p 
        //                                       LEFT JOIN Author a ON p.AuthorId = a.Id
        //                                       LEFT JOIN Blog b ON p.BlogId = b.Id 
        //                                       LEFT JOIN PostTag pt ON p.Id = pt.PostId
        //                                       LEFT JOIN Tag t ON t.Id = pt.TagId
        //                                  WHERE p.id = @id";
        //            cmd.Parameters.AddWithValue("id", id);
        //            SqlDataReader reader = cmd.ExecuteReader();

        //            Post post = null;

        //            while (reader.Read())
        //            {
        //                if (post == null)
        //                {
        //                    post = new Post()
        //                    {
        //                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //                        Title = reader.GetString(reader.GetOrdinal("PostTitle")),
        //                        Url = reader.GetString(reader.GetOrdinal("PostUrl")),
        //                        PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
        //                        Author = new Author()
        //                        {
        //                            Id = reader.GetInt32(reader.GetOrdinal("AuthorId")),
        //                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
        //                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
        //                            Bio = reader.GetString(reader.GetOrdinal("Bio")),
        //                        },
        //                        Blog = new Blog()
        //                        {
        //                            Id = reader.GetInt32(reader.GetOrdinal("BlogId")),
        //                            Title = reader.GetString(reader.GetOrdinal("BlogTitle")),
        //                            Url = reader.GetString(reader.GetOrdinal("BlogUrl")),
        //                        }
        //                    };
        //                }

        //                if (!reader.IsDBNull(reader.GetOrdinal("TagId")))
        //                {
        //                    post.Tags.Add(new Tag()
        //                    {
        //                        Id = reader.GetInt32(reader.GetOrdinal("TagId")),
        //                        Name = reader.GetString(reader.GetOrdinal("Name")),
        //                    });
        //                }
        //            }

        //            reader.Close();

        //            return post;

        //        }
        //    }
        //}

        //public List<Post> GetByUser(int userId)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT p.id,
        //                                       p.Title As PostTitle,
        //                                       p.URL AS PostUrl,
        //                                       p.PublishDateTime,
        //                                       p.AuthorId,
        //                                       p.BlogId,
        //                                       a.FirstName,
        //                                       a.LastName,
        //                                       a.Bio,
        //                                       b.Title AS BlogTitle,
        //                                       b.URL AS BlogUrl
        //                                  FROM Post p 
        //                                       LEFT JOIN Author a on p.AuthorId = a.Id
        //                                       LEFT JOIN Blog b on p.BlogId = b.Id 
        //                                 WHERE p.AuthorId = @authorId";
        //            cmd.Parameters.AddWithValue("@authorId", authorId);
        //            SqlDataReader reader = cmd.ExecuteReader();

        //            List<Post> posts = new List<Post>();
        //            while (reader.Read())
        //            {
        //                Post post = new Post()
        //                {
        //                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //                    Title = reader.GetString(reader.GetOrdinal("PostTitle")),
        //                    Url = reader.GetString(reader.GetOrdinal("PostUrl")),
        //                    PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
        //                    Author = new Author()
        //                    {
        //                        Id = reader.GetInt32(reader.GetOrdinal("AuthorId")),
        //                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
        //                        LastName = reader.GetString(reader.GetOrdinal("LastName")),
        //                        Bio = reader.GetString(reader.GetOrdinal("Bio")),
        //                    },
        //                    Blog = new Blog()
        //                    {
        //                        Id = reader.GetInt32(reader.GetOrdinal("BlogId")),
        //                        Title = reader.GetString(reader.GetOrdinal("BlogTitle")),
        //                        Url = reader.GetString(reader.GetOrdinal("BlogUrl")),
        //                    }
        //                };
        //                posts.Add(post);
        //            }

        //            reader.Close();

        //            return posts;
        //        }
        //    }
        //}

        //public void Insert(Post post)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"INSERT INTO Post (Title, URL, PublishDateTime, AuthorId, BlogId)
        //                                       VALUES (@title, @url, @publishDateTime, @authorId, @blogId)";
        //            cmd.Parameters.AddWithValue("@title", post.Title);
        //            cmd.Parameters.AddWithValue("@url", post.Url);
        //            cmd.Parameters.AddWithValue("@publishDateTime", post.PublishDateTime);
        //            cmd.Parameters.AddWithValue("@authorId", post.Author.Id);
        //            cmd.Parameters.AddWithValue("@blogId", post.Blog.Id);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        //public void Update(Post post)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        {
        //            using (SqlCommand cmd = conn.CreateCommand())
        //            {
        //                cmd.CommandText = @"UPDATE Post
        //                                        SET Title = @title,
        //                                            URL = @url,
        //                                            PublishDateTime = @publishDateTime,
        //                                            AuthorId = @authorId,
        //                                            BlogId = @blogId
        //                                        WHERE id  = @id";

        //                cmd.Parameters.AddWithValue("@title", post.Title);
        //                cmd.Parameters.AddWithValue("@url", post.Url);
        //                cmd.Parameters.AddWithValue("@publishDateTime", post.PublishDateTime);
        //                cmd.Parameters.AddWithValue("@authorId", post.Author.Id);
        //                cmd.Parameters.AddWithValue("@blogId", post.Blog.Id);
        //                cmd.Parameters.AddWithValue("@id", post.Id);

        //                cmd.ExecuteNonQuery();
        //            }
        //        }
        //    }
        //}

        //public void Delete(int id)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = "DELETE FROM Post WHERE id = @id";
        //            cmd.Parameters.AddWithValue("@id", id);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        //public void InsertTag(Post post, Tag tag)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"INSERT INTO PostTag (PostId, TagId)
        //                                               VALUES (@postId, @tagId)";
        //            cmd.Parameters.AddWithValue("@postId", post.Id);
        //            cmd.Parameters.AddWithValue("@tagId", tag.Id);
        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}
        //public void DeleteTag(int postId, int tagId)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"DELETE FROM PostTag 
        //                                 WHERE PostId = @postId AND 
        //                                       TagId = @tagId";
        //            cmd.Parameters.AddWithValue("@postId", postId);
        //            cmd.Parameters.AddWithValue("@tagId", tagId);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}
    }
}

