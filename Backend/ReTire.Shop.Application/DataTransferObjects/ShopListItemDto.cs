namespace ReTire.Shop.Application.DataTransferObjects
{
    public sealed class ShopListItemDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public int InStock { get; set; }
        public int DeliveryDays => InStock >= 1 ? 1 : 5;
        public decimal Price { get; set; }
    }
}
