using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void Add(PostTag postTag);
        void DeletePostTag(int id);
        List<PostTag> GetAllPostTags();
        PostTag GetPostTagById(int id);
    }
}