using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FreelancerApi1.Models
{
	public class Recibo
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? _Id { get; set; }

        [BsonElement("titulo")]
        public string titulo { get; set; } = null!;


        public string logo { get; set; } = null!;

		public string moneda { get; set; } = null!;

		public decimal monto { get; set; }



        public string descripcion { get; set; } = null!;

		public string direccion { get; set; } = null!;

		public string nombre { get; set; } = null!;

		public string tipoDocumento { get; set; } = null!;

		public string numeroDocumento { get; set; } = null!;

	}
}

