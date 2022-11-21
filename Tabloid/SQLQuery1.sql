SELECT p.id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime,
    p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId,

    c.name as CategoryName, u.DisplayName
FROM Post p
join category c on p.categoryId = c.id
join userProfile u on p.userProfileId = u.id
where p.IsApproved = 1;