using ContosoUniversity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContosoUniversity.ViewModels
{
    public class RegisterGrades
    {
        public IList<Enrollment> _enrollments { get; set; }
    }
}