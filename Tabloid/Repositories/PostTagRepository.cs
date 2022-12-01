using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration config) : base(config) { }


        //creat a postTag
        public void Add(PostTag postTag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO PostTag (TagId, PostId)
                    OUTPUT INSERTED.ID
                    VALUES (@tagId, @postId);
                ";

                    cmd.Parameters.AddWithValue("@tagId", postTag.TagId);
                    cmd.Parameters.AddWithValue("@postId", postTag.PostId);


                    int id = (int)cmd.ExecuteScalar();

                    postTag.Id = id;
                }
            }
        }

        //delete a postTag
        public void DeletePostTag(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM PostTag
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public List<PostTag> GetAllPostTags()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, PostId, TagId FROM PostTag";
                        //@"SELECT p.id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime,
                        //                    p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId,
                        //                    pt.PostId AS PostTagPostId, pt.TagId as PostTagId, t.name,

                        //                    c.name as CategoryName, u.DisplayName
                        //                FROM Post p 
                        //                left join PostTag pt on pt.PostId = p.Id
                        //                left join tag t on pt.TagId = t.Id
                        //               left join category c on p.categoryId = c.id
                        //               left join userProfile u on p.userProfileId = u.id
                                        
                        //                order by p.publishDateTime desc;";

                    //cmd.Parameters.AddWithValue("now", DateTime.Now);
                    //cmd.Parameters.AddWithValue("@tagId", postTag.TagId);
                    //cmd.Parameters.AddWithValue("@postId", postTag.PostId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<PostTag> postTags = new List<PostTag>();
                    while (reader.Read())
                    {
                        postTags.Add(new PostTag
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),          TagId = DbUtils.GetInt(reader, "TagId")
                        });
                        //Post post = new Post()
                        //{
                        //    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        //    Title = reader.GetString(reader.GetOrdinal("Title")),
                        //    Content = reader.GetString(reader.GetOrdinal("Content")),
                        //    ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                        //    PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                        //    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                        //    IsApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                        //    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                        //    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                        //    UserProfile = new UserProfile(),
                        //    Category = new Category(),
                        //    TagId = reader.GetInt32(reader.GetOrdinal("TagId")),
                        //    PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                        //    Tag = new Tag()
                        //};
                        //post.UserProfile.DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"));
                        //post.Category.Name = reader.GetString(reader.GetOrdinal("CategoryName"));
                        //post.Tag.Name = reader.GetString(reader.GetOrdinal("TagName"));

                        //posts.Add(post);
                    }

                    reader.Close();

                    return postTags;
                }
            }
        }
        public PostTag GetPostTagById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime,p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId, pt.PostId AS PostTagPostId, pt.TagId as PostTagId, t.name, c.name as CategoryName, u.DisplayName
                                        FROM Post p 
                                        left join PostTag pt on pt.PostId = p.Id
                                        left join tag t on pt.TagId = t.Id
                                        left join category c on p.categoryId = c.id
                                        left join userProfile u on p.userProfileId = u.id
                                        
                                        WHERE Id = @id
                                        ;";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    PostTag posttag = null;

                    if (reader.Read())
                    {
                        posttag = new PostTag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            TagId = reader.GetInt32(reader.GetOrdinal("TagId"))
                        };
                        ;

                    }

                    reader.Close();

                    return posttag;
                }
            }
        }

    }
}
