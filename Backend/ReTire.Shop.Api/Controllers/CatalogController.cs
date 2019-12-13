using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReTire.Shop.Application.Contracts.Services;

namespace ReTire.Shop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly ICatalogService _service;

        [HttpGet]
        public async Task<IActionResult> Get(
            string query= null,
            string brand = null,
            string type = null, 
            int? width = null,
            int? height = null, 
            string inch = null)
        {
            var models = await _service.List(query, brand, type, width, height, inch);
            return Ok(models);
        }


        [HttpGet("import")]
        public async Task<IActionResult> Import()
        {
            var model = await _service.Import();
            return Ok(model);
        }



        public CatalogController(ICatalogService service)
        {
            _service = service;
        }

    }
}