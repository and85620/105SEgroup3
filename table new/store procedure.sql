

DELIMITER //
create procedure  BuySellThing(Sid int,numberr int,stype int)
begin 

IF stype > 0 then
    set @Mprice= (select price from material where mid = Sid);
    set @MMMoney= (select money from player limit 1);
    update player set money = (@MMMoney-@Mprice*numberr*stype);

    set @MMnum = (select num from material where mid = Sid);
    update material set num = (@MMnum + numberr*stype) where mid = Sid;

ELSE
    set @Mprice= (select price from product where pid = Sid);
    set @MMMoney= (select money from player limit 1);
    update player set money = (@MMMoney-@Mprice*numberr*stype);

    set @MMnum = (select num from product where pid = Sid) ;
    update product set num = (@MMnum + numberr*stype) where pid = Sid;

end IF;
end//
DELIMITER //
