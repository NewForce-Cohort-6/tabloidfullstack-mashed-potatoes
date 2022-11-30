--SELECT p.id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime,
--                                            p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId,
--                                            pt.PostId AS PostTagPostId, pt.TagId as PostTagId, t.name,

--                                            c.name as CategoryName, u.DisplayName
--                                        FROM Post p 
--                                        left join PostTag pt on pt.PostId = p.Id
--                                        left join tag t on pt.TagId = t.Id
--                                       left join category c on p.categoryId = c.id
--                                       left join userProfile u on p.userProfileId = u.id
--                                        where p.IsApproved = 1
--                                        order by p.publishDateTime desc;

--Select * from PostTag

--set identity_insert [PostTag] on
--insert into PostTag (Id, PostId, TagId) values (3, 1, 5);
--insert into PostTag (Id, PostId, TagId) values (4, 2, 3);
----set identity_insert [PostTag] off
--SELECT p.id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime,p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId, pt.PostId AS PostTagPostId, pt.TagId as PostTagId, t.name, c.name as CategoryName, u.DisplayName
--                                        FROM Post p 
--                                        left join PostTag pt on pt.PostId = p.Id
--                                        left join tag t on pt.TagId = t.Id
--                                        left join category c on p.categoryId = c.id
--                                        left join userProfile u on p.userProfileId = u.id;


--SELECT p.id as PostId, p.Title, p.Content, p.ImageLocation, p.PublishDateTime, p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId, c.name as CategoryName, u.DisplayName, t.Id as TagId, t.Name
--  FROM Post p
-- left join category c on p.categoryId = c.id
-- left join userProfile u on p.userProfileId = u.id
-- left join PostTag pt on p.Id = pt.PostId
-- left join Tag t on pt.TagId = t.Id
--where p.id = 1

--set identity_insert [PostTag] on
--insert into [PostTag] (Id, PostId, TagId)
--values (9, 1, 1), (6, 4, 3), (7, 1, 2), (8, 3, 2);
--set identity_insert [PostTag] off
--Select * FROM PostTag;

