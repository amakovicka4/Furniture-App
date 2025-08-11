using Microsoft.AspNetCore.Mvc;
using OnlineShoppingApp.Models;

namespace OnlineShoppingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        [HttpGet("products/featured")]
        public IActionResult GetFeaturedProducts()
        {
            var accessor = new ProductAccessor();
            var products = accessor.GetFeaturedProducts();
            return Ok(products);
        }
    }
}
