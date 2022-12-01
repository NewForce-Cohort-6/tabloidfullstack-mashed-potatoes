using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid
{
    public interface ISubscriptionRepository
    {
        public List<Subscription> GetAll();
        //public Post GetById(int id);
        //public List<Post> GetByUser(int userId);
        public void Insert(Subscription subscription);
        public void Update(Subscription subscription);
        public void Delete(int id);
    }
}
