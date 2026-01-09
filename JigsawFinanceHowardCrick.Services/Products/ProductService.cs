using JigsawFinanceHowardCrick.Services.Products.Abstractions;
using System;
using System.Collections.Generic;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace JigsawFinanceHowardCrick.Services.Products
{
    public class ProductService : IProductService
    {
        public async Task<ProductListDto?> GetProducts(int limit, int skip)
        {
            using var client = new HttpClient();
            try
            {
                var endpoint = new Uri($"https://dummyjson.com/products?limit={limit}&skip={skip}&select=thumbnail,price,title,tags");

                var result = await client.GetFromJsonAsync<ProductListDto>(endpoint);

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching data: {ex.Message}");
                return null;
            }
        }

        public async Task<ProductDetailsDto?> GetProductDetails(int productId)
        {
            using var client = new HttpClient();
            try
            {
                var endpoint = new Uri($"https://dummyjson.com/products/{productId}");
                var result = await client.GetFromJsonAsync<ProductDetailsDto>(endpoint);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching data: {ex.Message}");
                return null;
            }
        }
    }

    public class ProductListDto
    {
        public List<ProductDetailsForListDto> Products { get; set; } = [];
        public required int Total { get; set; }
    }


    public class ProductDetailsForListDto
    {
        public required int Id { get; set; }
        public required string Thumbnail { get; set; }
        public required string Title { get; set; }
        public required decimal Price { get; set; }
        public List<string>? Tags { get; set; }
    }

    public class ProductDetailsDto
    {
        public required string Title { get; set; }
        public required decimal Price { get; set; }

        public string? Description { get; set; }

        public List<string>? Tags { get; set; }
        
        public string? ShippingInformation { get; set; }

        public List<string>? Images { get; set; }
    }
}
