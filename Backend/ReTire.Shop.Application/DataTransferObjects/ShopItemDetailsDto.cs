namespace ReTire.Shop.Application.DataTransferObjects
{
    public sealed class ShopItemDetailsDto
    {
        public string Id { get; set; }
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
    }
}
