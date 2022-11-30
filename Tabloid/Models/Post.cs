using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string ImageLocation { get; set; }

        public string Content { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }
        public DateTime PublishDateTime { get; set; }
        public Boolean IsApproved { get; set; }
        public int CategoryId { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
        public Category Category { get; set; }
        public List<Tag> Tags { get; set; } = new List<Tag>();
 


        //public List<Comment> Comments { get; set; }

    }
}
