using Microsoft.Azure.Cosmos.Table;

namespace ReTire.Shop.Application.Entities
{
    public sealed class ShopItemEntity : TableEntity
    {

        public string Name { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Inch { get; set; }
        public string Season { get; set; }
        public string GripIndication { get; set; }
        public string FuelConsumption { get; set; }
        public string NoiseLevel { get; set; }
        public int InStock { get; set; }
        public string Price { get; set; }
    }
}
