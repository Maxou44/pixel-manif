function move(rioter)
{
	var zone;
	
	if ((zone = check_position(rioter._x, rioter._y, rioter._direction)) == -1)
		return (-1);
	
	if (zone == 0)
	{
		if (check_crs(940, 15, 721, 245) <= check_crs(1660, 260, 212, 380))
			return (2);
		else
			return (1);
	}
	
	if (zone == 1)
	{
			if ((check_crs(939, 395, 721, 245) <= check_crs(1660, 15, 212, 418)) && (check_crs(939, 395, 721, 245) <= check_crs(1660, 642, 212, 380)))
				return (2);
			
			
			
			if (getRandomInt(0, 2) == 1)
				return (0);
			else
				return (1);
	}
	
	if (zone == 2)
	{	
		if (check_crs(940, 817, 721, 205) <= check_crs(1659, 642, 212, 380))
			return (2);
		else
			return (0);
	}
	// 2eme rangee
	
	if (zone == 3)
	{	
		if (check_crs(129, 15, 721, 205) <= check_crs(939, 260, 212, 380))
			return (2);
		else
			return (1);
	}
	
	if (zone == 4)
	{
			if ((check_crs(425, 435, 516, 205) <= check_crs(939, 15, 212, 205)) && (check_crs(425, 435, 516, 205) <= check_crs(939, 642, 212, 380)))
				return (2);
		if (getRandomInt(0, 2) == 1)
				return (0);
			else
				return (1);
		
	}
	
	if (zone == 5)
	{	
		if (check_crs(219, 817, 721, 205) <= check_crs(939, 435, 212, 380))
			return (2);
		else
			return (0);
	}
	
	// 3 eme rangee

	if (zone == 6)
		return (1);
	
	if (zone == 7)
		return (2);
	
	if (zone == 8)
		return (0);
	
	if (zone == 9)
		return (2);
	
	if (zone == 10)
		return (2);
	
	if (zone == 11)
		return (0);
	
	if (zone == 12)	
	return (1);
}

function check_position(x, y, direction)
{
	var ret = -1;
	
	var x1 = 1660;
	var y1 = 15;
	var x2 = 164;
	var y2 = 204;
	
	if ((x >= x1 && x <= x1 + x2) && (y >= y1 && y <= y1 + y2))
		ret = 0;
	
	x1 = 1660;
	y1 = 434;
	x2 = 165;
	y2 = 205;
	
	if ((x >= x1 && x <= x1 + x2) && (y >= y1 && y <= y1 + y2))
		ret = 1;
	
	x1 = 1659;
	y1 = 777;
	x2 = 165;
	y2 = 245;
	
	if ((x >= x1 && x <= x1 + x2) && (y >= y1 && y <= y1 + y2))
		ret = 2;
	
	x1 = 939;
	y1 = 15;
	x2 = 165;
	y2 = 205;
	
	if ((x >= x1 && x <= x1 + x2) && (y >= y1 && y <= y1 + y2))
		ret = 3;
	
	x1 = 939;
	y1 = 395;
	x2 = 165;
	y2 = 205;
	
	if ((x >= x1 && x <= x1 + x2) && (y >= y1 && y <= y1 + y2))
		ret = 4;
	
	x1 = 939;
	y1 = 777;
	x2 = 165;
	y2 = 245;
	
	if ((x >= x1 && x <= x1 + x2) && (y >= y1 && y <= y1 + y2))
		ret = 5;
	
	x1 = 219;
	y1 = 15;
	x2 = 165;
	y2 = 205;
	
	if ((x >= x1 && x <= x1 + x2) && (y >= y1 && y <= y1 + y2))
		ret = 6;
	
	x1 = 220;
	y1 = 515;
	x2 = 180;
	y2 = 55;
	
	if ((x >= x1 && x <= x1 + x2) && (y + 40 >= y1 && y + 40 <= y1 + y2) && direction == 0)
		return (7);
	
	x1 = 220;
	y1 = 515;
	x2 = 180;
	y2 = 55;
	
	if ((x >= x1 && x <= x1 + x2) && (y >= y1 && y <= y1 + y2) && direction != 0)
		return (7);
	
	x1 = 219;
	y1 = 777;
	x2 = 165;
	y2 = 245;
	
	if ((x >= x1 && x <= x1 + x2) && (y >= y1 && y <= y1 + y2))
		ret = 8;
	
	x1 = 220;
	y1 = 1;
	x2 = 1700;
	y2 = 55;
	
	if ((x >= x1 && x <= x1 + x2) && (y - 40 >= y1 && y - 40 <= y1 + y2) && direction == 0)
		return (9);
	
	x1 = 220;
	y1 = 1025;
	x2 = 1700;
	y2 = 55;
	
	if ((x >= x1 && x <= x1 + x2) && (y + 40 >= y1 && y + 40 <= y1 + y2) && direction == 1)
		return (10);

	x1 = 1;
	y1 = 570;
	x2 = 240;
	y2 = 455;
	
	if ((x - 40 >= x1 && x - 40 <= x1 + x2) && (y >= y1 && y  <= y1 + y2) && direction == 2)
		return (11);
	
	x1 = 1;
	y1 = 1;
	x2 = 240;
	y2 = 450;
	
	if ((x - 40 >= x1 && x - 40 <= x1 + x2) && (y >= y1 && y <= y1 + y2) && direction == 2)
		return (12);	
	
	if (Math.random() > 0.95)
		return (ret);
	return (-1);
}

function check_crs(x, y, x2, y2)
{
	var nb = 0;
	for (var z = 0; z < data.crs.length; z++)
	{
		if (collision({x: data.crs[z]._x, y: data.crs[z]._y, width: 40, height: 40}, {x: x, y: y, width: x2, height: y2}))
			nb++;
	}
	//if (nb)
	//	console.log(nb);
	return (nb);
}



function check_mairie(rioter)
{
	x1 = 1;
	y1 = 515;
	x2 = 220;
	y2 = 55;
	
	if ((rioter._x >= x1 && rioter._x - 40 <= x1 + x2) && (rioter._y >= y1 && rioter._y <= y1 + y2))
		return (rioter._items[0].pts);
	return (-1);
}