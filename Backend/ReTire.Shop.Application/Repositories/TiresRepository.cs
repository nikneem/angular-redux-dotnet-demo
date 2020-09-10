using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Bogus;
using LinqKit;
using ReTire.Shop.Application.DataTransferObjects;
using ReTire.Shop.Application.Entities;

namespace ReTire.Shop.Application.Repositories
{
    public class TiresRepository
    {
        public TiresRepository()
        {
            SeedBogusData();
        }

        private List<ShopItemEntity> _tires;



        public List<ShopListItemDto> List(string query, string brand, string type, int? width, int? height, string inch)
        {
            var filter = PredicateBuilder.New<ShopItemEntity>()
                .And(x => true);

            if (!string.IsNullOrEmpty(brand))
            {
                filter = filter.And(fld => fld.Brand.Contains(brand, StringComparison.InvariantCultureIgnoreCase));
            }
            if (!string.IsNullOrEmpty(query))
            {
                filter = filter.And(fld => fld.Name.Contains(query, StringComparison.InvariantCultureIgnoreCase));
            }
            if (!string.IsNullOrEmpty(type))
            {
                filter = filter.And(fld => fld.Type.Contains(type, StringComparison.InvariantCultureIgnoreCase));
            }
            if (width.HasValue)
            {
                filter = filter.And(fld => Equals(fld.Width, width));
            }
            if (height.HasValue)
            {
                filter = filter.And(fld => Equals(fld.Height, height));
            }
            if (!string.IsNullOrEmpty(inch))
            {
                filter = filter.And(fld => fld.Inch.Contains(inch, StringComparison.InvariantCultureIgnoreCase));
            }

            var queryFilter = filter.Expand().Compile();
            return _tires.Where(queryFilter).Select(ent => new ShopListItemDto
            {
                Brand = ent.Brand,
                InStock = ent.InStock,
                Type = ent.Type,
                Id = ent.Id.ToString(),
                Name = ent.Name,
                Price = decimal.Parse(ent.Price.ToString()),
                Size = $"{ent.Width}/{ent.Height}/{ent.Inch}"
            }).OrderBy(dto => dto.Price).ToList();
        }


        private void SeedBogusData()
        {
            var brands = new[]
                {"Mechilen", "Bridgerock", "Cantinentol", "Bankook", "Firebrick", "Perrilly", "Goodmonth"};
            var season = new[] {"Summer", "Winter", "All-Season", "Other"};
            var values = new[] {"AAA", "AA", "A", "B", "C", "D", "E"};
            var names = new[]
            {
                "PerfectGrip", "Tarmacsticker", "Gripper", "Noisesaver", "Milestone", "Weightlifter", "Heavy",
                "Carrier", "Contact", "Roadster", "Contacter", "Longlast"
            };
            var types = new[]
            {
                "PerfectGrip", "Tarmacsticker", "Gripper", "Noisesaver", "Milestone", "Weightlifter", "Heavy",
                "Carrier", "Contact", "Roadster", "Contacter", "Longlast"
            };

            var fakeTires = new Faker<ShopItemEntity>()
                .RuleFor(t => t.Id, s => Guid.NewGuid())
                .RuleFor(t => t.Brand, f => f.PickRandom(brands))
                .RuleFor(t => t.Type, f =>  f.PickRandom(types))
                .RuleFor(t => t.Width, f => f.Random.Int(0, 21) * 10 + 135)
                .RuleFor(t => t.Height, f => f.Random.Int(0, 15) * 5 + 25)
                .RuleFor(t => t.Inch, f => $"R{f.Random.Int(12, 24)}")
                .RuleFor(t => t.FuelConsumption, f => f.PickRandom(values))
                .RuleFor(t => t.GripIndication, f => f.PickRandom(values))
                .RuleFor(t => t.Name, f => f.PickRandom(names))
                .RuleFor(t => t.NoiseLevel, f => $"{f.Random.Int(50, 120)} dB")
                .RuleFor(t => t.Price, f => f.Random.Int(25, 150))
                .RuleFor(t => t.Season, f => f.PickRandom(season))
                .RuleFor(t => t.InStock, f => f.Random.Int(0, 50) * 4);

            _tires = new List<ShopItemEntity>();
            _tires.AddRange(fakeTires.Generate(500));
        }


        public bool Delete(string id)
        {
            var idGuid = Guid.Parse(id);
            var tire = _tires.FirstOrDefault(itm => itm.Id.Equals(idGuid));
            if (tire != null)
            {
                _tires.Remove(tire);
                return true;
            }

            return false;
        }
    }
}