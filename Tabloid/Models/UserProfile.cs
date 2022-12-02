﻿using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Tabloid.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public DateTime CreateDateTime { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [Required]
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}