using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid
{
    public interface IPostRepository
    {
        public List<Post> GetAll();
        //public Post Get(int id);
        //public List<Post> GetByUser(int userId);
        //public void Insert(Post post);
        //public void Update(Post post);
        //public void Delete(int id);
        //public void InsertTag(Post post, Tag tag);
        //public void DeleteTag(int postId, int tagId);

    }
}