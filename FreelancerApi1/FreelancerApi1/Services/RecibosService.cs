using System;
using FreelancerApi1.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace FreelancerApi1.Services
{
	public class RecibosService
	{
		private readonly IMongoCollection<Recibo> _recibosCollection;

		public RecibosService(IOptions<FreelancerDatabaseSettings> freelancerDataBaseSettings)
		{
			var mongoClient = new MongoClient(freelancerDataBaseSettings.Value.ConnectionString);
			var mongoDatabase = mongoClient.GetDatabase(freelancerDataBaseSettings.Value.DatabaseName);

			_recibosCollection = mongoDatabase.GetCollection<Recibo>(freelancerDataBaseSettings.Value.RecibosCollectionName);
		}

		public async Task<List<Recibo>> GetAsync() => await _recibosCollection.Find(_ => true).ToListAsync();
		public async Task<Recibo?> GetAsync(string id) => await _recibosCollection.Find(x => x._Id == id).FirstOrDefaultAsync();
		public async Task CreateAsync(Recibo newRecibo) => await _recibosCollection.InsertOneAsync(newRecibo);
		public async Task UpdateAsync(string id, Recibo updatedRecibo) => await _recibosCollection.ReplaceOneAsync(x => x._Id == id, updatedRecibo);
		public async Task RemoveAsync(string id) => await _recibosCollection.DeleteOneAsync(x => x._Id == id);
	}
}

