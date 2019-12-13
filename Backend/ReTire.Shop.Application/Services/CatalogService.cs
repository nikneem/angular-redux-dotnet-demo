using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Configuration;
using ReTire.Shop.Application.Contracts.Services;
using ReTire.Shop.Application.DataTransferObjects;
using ReTire.Shop.Application.Entities;

namespace ReTire.Shop.Application.Services
{
    public sealed class CatalogService : ICatalogService
    {

        private CloudTable _table;
        private string importFile;

        public async Task<List<ShopListItemDto>> List(string query, string brand, string type, int? width, int? height, string inch)
        {
            await _table.CreateIfNotExistsAsync();
            var filters = new List<string>
            {
                TableQuery.GenerateFilterCondition(
                    nameof(ShopItemEntity.PartitionKey),
                    QueryComparisons.Equal,
                    PartitionKeys.Tires)
            };

            if (!string.IsNullOrEmpty(brand))
            {
                filters.Add(
                    TableQuery.GenerateFilterCondition(
                        nameof(ShopItemEntity.Brand),
                        QueryComparisons.Equal,
                        brand));
            }
            if (!string.IsNullOrEmpty(query))
            {
                filters.Add(
                    TableQuery.GenerateFilterCondition(
                        nameof(ShopItemEntity.Name),
                        QueryComparisons.Equal,
                        query));
            }
            if (!string.IsNullOrEmpty(type))
            {
                filters.Add(
                    TableQuery.GenerateFilterCondition(
                        nameof(ShopItemEntity.Type),
                        QueryComparisons.Equal,
                        type));
            }
            if (width.HasValue)
            {
                filters.Add(
                    TableQuery.GenerateFilterConditionForInt(
                        nameof(ShopItemEntity.Width),
                        QueryComparisons.Equal,
                        width.Value));
            }
            if (height.HasValue)
            {
                filters.Add(
                    TableQuery.GenerateFilterConditionForInt(
                        nameof(ShopItemEntity.Height),
                        QueryComparisons.Equal,
                        height.Value));
            }
            if (!string.IsNullOrEmpty(inch))
            {
                filters.Add(
                    TableQuery.GenerateFilterCondition(
                        nameof(ShopItemEntity.Inch),
                        QueryComparisons.Equal,
                        inch));
            }

            var filter = CombineFilters(filters);

            var tableQuery = new TableQuery<ShopItemEntity>().Where(filter);
            var queryResult = await _table.ExecuteQuerySegmentedAsync(tableQuery, null);
            return queryResult.Results.Select(ent => new ShopListItemDto
            {
                Brand = ent.Brand,
                InStock = ent.InStock,
                Type = ent.Type,
                Id = ent.RowKey,
                Name = ent.Name,
                Price = decimal.Parse(ent.Price),
                Size = $"{ent.Width}/{ent.Height}/{ent.Inch}"
            }).OrderBy(dto => dto.Name).ToList();
        }
        public async Task<ShopItemDetailsDto> Single(string id)
        {
            await _table.CreateIfNotExistsAsync();

            var findTo = TableOperation.Retrieve<ShopItemEntity>(PartitionKeys.Tires, id);
            var findOperationResult = await _table.ExecuteAsync(findTo);
            var entity = findOperationResult.Result as ShopItemEntity;
            return new ShopItemDetailsDto
            {
                Id = entity.RowKey,
                Brand = entity.Brand,
                Type = entity.Type,
                Width = entity.Width,
                Height = entity.Height,
                Inch = entity.Inch,
                InStock = entity.InStock,
                Name = entity.Name,
                FuelConsumption = entity.FuelConsumption,
                GripIndication = entity.GripIndication,
                NoiseLevel = entity.NoiseLevel,
                Season = entity.Season
            };

        }
        public async Task<ShopItemDetailsDto> Create(ShopItemDetailsDto dto)
        {
            await _table.CreateIfNotExistsAsync();

            var entity = new ShopItemEntity
            {
                PartitionKey = PartitionKeys.Tires,
                RowKey = Guid.NewGuid().ToString(),
                Brand = dto.Brand,
                Type = dto.Type,
                Width = dto.Width,
                Height = dto.Height,
                Inch = dto.Inch,
                InStock = dto.InStock,
                Name = dto.Name,
                FuelConsumption = dto.FuelConsumption,
                GripIndication = dto.GripIndication,
                NoiseLevel = dto.NoiseLevel,
                Season = dto.Season
            };

            var findTo = TableOperation.Insert(entity);
            await _table.ExecuteAsync(findTo);
            dto.Id = entity.RowKey;
            return dto;
        }
        public async Task<ShopItemDetailsDto> Update(ShopItemDetailsDto dto)
        {
            await _table.CreateIfNotExistsAsync();

            var entity = new ShopItemEntity
            {
                PartitionKey = PartitionKeys.Tires,
                RowKey = Guid.NewGuid().ToString(),
                Brand = dto.Brand,
                Type = dto.Type,
                Width = dto.Width,
                Height = dto.Height,
                Inch = dto.Inch,
                InStock = dto.InStock,
                Name = dto.Name,
                FuelConsumption = dto.FuelConsumption,
                GripIndication = dto.GripIndication,
                NoiseLevel = dto.NoiseLevel,
                Season = dto.Season
            };

            var findTo = TableOperation.InsertOrReplace(entity);
            await _table.ExecuteAsync(findTo);
            return dto;
        }
        public async Task<bool> Delete(string id)
        {
            await _table.CreateIfNotExistsAsync();

            var entity = new ShopItemEntity
            {
                PartitionKey = PartitionKeys.Tires,
                RowKey = id,
                ETag = "*"
            };

                var findTo = TableOperation.Delete(entity);
                await _table.ExecuteAsync(findTo);
            return true;
        }

        public async Task<object> Import()
        {
            var imported = 0;
            
            if (File.Exists(importFile))
            {
                var batch = new TableBatchOperation();
                using var fileStream = new FileStream(importFile, FileMode.Open, FileAccess.Read, FileShare.Read);
                var reader = new StreamReader(fileStream);
                // Skip the first line
                await reader.ReadLineAsync();
                do
                {
                    var line = await reader.ReadLineAsync();
                    if (line != null)
                    {
                        var parts = line.Split(';');
                        if (parts.Length == 11)
                        {
                            var sid = new ShopItemEntity
                            {
                                PartitionKey = PartitionKeys.Tires,
                                RowKey = Guid.NewGuid().ToString(),
                                Name = $"{parts[0]} {parts[1]}",
                                Brand = parts[0],
                                Type = parts[1],
                                Width = int.Parse(parts[2]),
                                Height = int.Parse(parts[3]),
                                Inch = parts[4],
                                Season = parts[5],
                                GripIndication = parts[6],
                                FuelConsumption = parts[7],
                                NoiseLevel = parts[8],
                                InStock = int.Parse(parts[9]),
                                Price = parts[10]
                            };
                            batch.Add(TableOperation.Insert(sid));
                            if (batch.Count == 100)
                            {
                                await _table.ExecuteBatchAsync(batch);
                                batch = new TableBatchOperation();
                            }
                            imported++;
                        }
                    }
                } while (!reader.EndOfStream);

                if (batch.Count > 0)
                {
                    await _table.ExecuteBatchAsync(batch);
                }
            }

            return imported;
        }

        private string CombineFilters(List<string> filters)
        {
            if (filters == null || filters.Count == 0)
            {
                return null;
            }

            if (filters.Count == 1)
            {
                return filters.FirstOrDefault();
            }

            var filter = filters.FirstOrDefault();
            filters.RemoveAt(0);
            return AddAndFilter(filter, filters);
        }

        private string AddAndFilter(string currentFilter, List<string> filters)
        {
            currentFilter = TableQuery.CombineFilters(currentFilter, TableOperators.And, filters.First());
            filters.RemoveAt(0);
            if (filters.Count > 0)
            {
                return AddAndFilter(currentFilter, filters);
            }

            return currentFilter;
        }

        public CatalogService(IConfiguration configuration)
        {
            var storageConnectionString = configuration.GetConnectionString(Constants.ConnectionStringCloudStorageAccount);
            var storageAccount = CloudStorageAccount.Parse(storageConnectionString);
            var tableClient = storageAccount.CreateCloudTableClient();
            _table = tableClient.GetTableReference(TableNames.Tires);
            var importSection = configuration.GetSection("ImportFile");
            importFile = importSection.Value;
        }

    }
}
