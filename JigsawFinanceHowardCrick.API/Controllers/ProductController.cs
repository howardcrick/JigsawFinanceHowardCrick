using JigsawFinanceHowardCrick.Services.Products;
using JigsawFinanceHowardCrick.Services.Products.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace JigsawFinanceHowardCrick.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        [HttpGet(Name = "GetProducts")]
        [ProducesResponseType<ProductListDto>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IResult> GetProducts(int limit, int skip, IProductService productService)
        {
            var products = await productService.GetProducts(limit, skip);
            return products == null ? Results.NotFound() : Results.Ok(products);
        }

        [HttpGet("{productId}", Name = "GetProductDetails")]
        [ProducesResponseType<ProductDetailsDto>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IResult> GetProductDetails(int productId, IProductService productService)
        {
            var productDetails = await productService.GetProductDetails(productId);
            return productDetails == null ? Results.NotFound() : Results.Ok(productDetails);
        }
    }
}
