using AuthApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AuthApp.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: api/<UserController>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public IEnumerable<User> Get()
        {
            var users = new List<User>
            {
                new User { Id = 1, Name = "Jada Kelsall", Email = "jkelsall0@marriott.com", Gender = "Female" },
                new User { Id = 2, Name = "Frederigo Grene", Email = "fgrene1@mysql.com", Gender = "Male" },
                new User { Id = 3, Name = "Naomi Pallent", Email = "npallent2@nationalgeographic.com", Gender = "Female" },
                new User { Id = 4, Name = "Lindon McMonies", Email = "lmcmonies3@xing.com", Gender = "Male" },
            };

            return users;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}