using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductFeatureController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProductFeatureController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/ProductFeature
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductFeature>>> GetProductFeatures()
        {
            // TODO: consider using service layer to encapsulate business logic
            return await _context.ProductFeatures.ToListAsync();
        }

        // GET api/ProductFeature/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductFeature>> GetProductFeature(int id)
        {
            // TODO: consider using service layer to encapsulate business logic
            var ProductFeature = await _context.ProductFeatures.FindAsync(id);
            if (ProductFeature == null)
            {
                return NotFound();
            }
            return ProductFeature;
        }

        // POST api/ProductFeature
        [HttpPost]
        public async Task<ActionResult<ProductFeature>> PostProductFeature(ProductFeature ProductFeature)
        {
            // TODO: Validate the ProductFeature object
            // TODO: consider using service layer to encapsulate business logic
            _context.ProductFeatures.Add(ProductFeature);
            await _context.SaveChangesAsync();

            // Return a 201 Created response with the new ProductFeature
            return CreatedAtAction(nameof(GetProductFeature), new { id = ProductFeature.Id }, ProductFeature);
        }

        // PUT api/ProductFeature/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductFeature(int id, ProductFeature ProductFeature)
        {
            // TODO: Validate the ProductFeature object
            if (id != ProductFeature.Id)
            {
                return BadRequest();
            }

            _context.Entry(ProductFeature).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductFeatureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/ProductFeature/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductFeature(int id)
        {
            var ProductFeature = await _context.ProductFeatures.FindAsync(id);
            if (ProductFeature == null)
            {
                return NotFound();
            }

            _context.ProductFeatures.Remove(ProductFeature);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductFeatureExists(int id)
        {
            return _context.ProductFeatures.Any(entity => entity.Id == id);
        }
    }
}
