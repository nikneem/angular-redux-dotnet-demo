using System.Collections.Generic;
using System.Threading.Tasks;
using ReTire.Shop.Application.DataTransferObjects;

namespace ReTire.Shop.Application.Contracts.Services
{
    public interface ICatalogService
    {
        Task<List<ShopListItemDto>> List(string query, string brand, string type, int? width, int? height, string inch);
        Task<ShopItemDetailsDto> Single(string id);
        Task<ShopItemDetailsDto> Create(ShopItemDetailsDto dto);
        Task<ShopItemDetailsDto> Update(ShopItemDetailsDto dto);
        Task<bool> Delete(string id);
        Task<object> Import();
    }
}