using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Repositories;
using Tabloid.Utils;


namespace Tabloid
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Subscription> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime from Subscription";

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Subscription> subscriptions = new List<Subscription>();
                    while (reader.Read())
                    {
                        Subscription subscription = new Subscription()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            SubscriberUserProfileId = reader.GetInt32(reader.GetOrdinal("SubscriberUserProfileId")),
                            ProviderUserProfileId = reader.GetInt32(reader.GetOrdinal("ProviderUserProfileId")),
                            BeginDateTime = DbUtils.GetDateTime(reader,"BeginDateTime")
                        };

                        if (DbUtils.IsNotDbNull(reader, "EndDateTime"))
                        {
                            subscription.EndDateTime = DbUtils.GetDateTime(reader, "EndDateTime");
                        }

                        subscriptions.Add(subscription);
                    }

                    reader.Close();

                    return subscriptions;
                }
            }
        }

        public void Insert(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime )
                        OUTPUT INSERTED.ID
                        VALUES (@SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime )";
                    cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                    cmd.Parameters.AddWithValue("@ProviderUserProfileId", subscription.ProviderUserProfileId);
                    cmd.Parameters.AddWithValue("@BeginDateTime", DateTime.Now);

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
