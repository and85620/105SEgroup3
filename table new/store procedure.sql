
DELIMITER //
create procedure  BuySellThing(Sid int,numberr int,stype int)
begin 

set @Mprice= (select price from material where mid = Sid);
set @MMMoney= (select money from player limit 1);
update player set money = (@MMMoney-@Mprice*numberr*stype);

set @MMnum = (select num from material where mid = Sid);
update material set num = (@MMnum + numberr*stype) where mid = Sid;

end//
DELIMITER ;
