using FreelancerApi1.Models;
using FreelancerApi1.Services;
using Microsoft.AspNetCore.Mvc;
using System;

namespace FreelancerApi1.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class RecibosController : ControllerBase
	{
		private readonly RecibosService _recibosService;

		public RecibosController(RecibosService recibosService) => _recibosService = recibosService;

		[HttpGet]
		public async Task<List<Recibo>> Get() => await _recibosService.GetAsync();

		[HttpGet("{id:length(24)}")]
		public async Task<ActionResult<Recibo>> Get(string id)
		{
			var recibo = await _recibosService.GetAsync(id);

			if (recibo is null)
			{
				return NotFound();
			}
			return recibo;
		}

		[HttpPost]
		public async Task<IActionResult> Post(Recibo newRecibo)
		{
			await _recibosService.CreateAsync(newRecibo);

			return CreatedAtAction(nameof(Get), new { id = newRecibo._Id }, newRecibo);
		}

		[HttpPut("{id:length(24)}")]
		public async Task<IActionResult> Update(string id, Recibo updatedRecibo)
		{
			var recibo = await _recibosService.GetAsync(id);

			if (recibo is null)
			{
				return NotFound();
			}

			updatedRecibo._Id = recibo._Id;

			await _recibosService.UpdateAsync(id, updatedRecibo);

			return NoContent();
		}

		[HttpDelete("{id:length(24)}")]
		public async Task<IActionResult> Delete(string id)
		{
			var recibo = await _recibosService.GetAsync(id);

			if (recibo is null)
			{
				return NotFound();
			}

			await _recibosService.RemoveAsync(id);

			return NoContent();
		}
    }
}

