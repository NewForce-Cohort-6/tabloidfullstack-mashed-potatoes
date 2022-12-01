using System;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;

namespace Tabloid
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        public SubscriptionController(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subscriptionRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            subscription.BeginDateTime = DateTime.Now;
            _subscriptionRepository.Insert(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }
    }
}
