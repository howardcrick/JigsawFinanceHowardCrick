using System;
using System.Collections.Generic;
using System.Text;

namespace JigsawFinanceHowardCrick.Services.Products.Abstractions
{
    public interface IProductService
    {
        Task<ProductDetailsDto?> GetProductDetails(int productId);
        Task<ProductListDto?> GetProducts(int limit, int skip);
    }
}
