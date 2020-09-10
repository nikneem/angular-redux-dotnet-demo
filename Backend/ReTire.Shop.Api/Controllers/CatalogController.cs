using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReTire.Shop.Application.Repositories;

namespace ReTire.Shop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly TiresRepository _repository;

        [HttpGet]
        public IActionResult Get(
            string query= null,
            string brand = null,
            string type = null, 
            int? width = null,
            int? height = null, 
            string inch = null)
        {
            var models =  _repository.List(query, brand, type, width, height, inch);
            return Ok(models);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(
            string id)
        {
            bool result =  _repository.Delete(id);
            return Ok(result);
        }




        public CatalogController(TiresRepository repository)
        {
            _repository = repository;
        }

    }
}