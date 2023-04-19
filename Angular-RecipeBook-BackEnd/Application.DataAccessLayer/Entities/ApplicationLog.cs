using System;
using System.ComponentModel.DataAnnotations;

namespace Application.DataAccessLayer.Entities
{
    public class ApplicationLog
    {
        [Key]
        public long Id { get; set; }

        [MaxLength(50)]
        public string MachineName { get; set; }

        public DateTime Logged { get; set; }

        [MaxLength(50)]
        public string Level { get; set; }

        public string Message { get; set; }

        [MaxLength(250)]
        public string Logger { get; set; }

        public string Callsite { get; set; }

        public string Exception { get; set; }
    }
}
