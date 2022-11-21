using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Repositories;
using Tabloid.Utils;

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
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
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

        public Post GetById(int id)
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
                                        where p.id = @id";
                    cmd.Parameters.AddWithValue("id", id);
                    SqlDataReader reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
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
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        public List<Post> GetByUser(int userId)
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
                                        where p.IsApproved = 1 and p.publishDateTime < @now and p.userProfileId = @id
                                        order by p.publishDateTime desc;";
                    cmd.Parameters.AddWithValue("now", DateTime.Now);
                    cmd.Parameters.AddWithValue("id", userId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Post> posts = new List<Post>();
                    while (reader.Read())
                    {
                        Post post = new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
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

        public void Insert(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, Content, ImageLocation, CreateDateTime, PublishDateTime,
                            IsApproved, CategoryId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime,
                            @IsApproved, @CategoryId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@ImageLocation", post.ImageLocation);
                    cmd.Parameters.AddWithValue("@CreateDateTime", DateTime.Now);

                    object published = post.PublishDateTime < DateTime.Parse("1/1/1753") ? DateTime.Now : post.PublishDateTime;

                    DbUtils.AddParameter(cmd, "@PublishDateTime", published);

                    cmd.Parameters.AddWithValue("@IsApproved", true);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }        

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

