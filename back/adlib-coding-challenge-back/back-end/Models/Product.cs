using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Title { get; set; }

        [Required]
        // Allowed values: S, M, L, XL
        [RegularExpression("S|M|L|XL")]
        public string EstimatedComplexity { get; set; }

        [Required]
        // Allowed values: New, Active, Closed, Abandoned
        // Consider using an enum instead of a string, or a lookup table
        [RegularExpression("New|Active|Closed|Abandoned")]
        public string Status { get; set; }

        public DateTime? TargetCompletionDate { get; set; }
        public DateTime? ActualCompletionDate { get; set; }



    }
}
