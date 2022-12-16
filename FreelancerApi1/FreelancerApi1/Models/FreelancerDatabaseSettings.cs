using System;
namespace FreelancerApi1.Models
{
	public class FreelancerDatabaseSettings
	{
		public string ConnectionString { get; set; } = null!;
		public string DatabaseName { get; set; } = null!;
		public string RecibosCollectionName { get; set; } = null!;
	}
}

