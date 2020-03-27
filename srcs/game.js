var data =
{
collider : [[405, 260, 520, 135], [1124, 260, 520, 135], [405, 640, 520, 140], [1124, 640, 520, 140], [0, 0, 1920, 15], [0, 985, 1920, 95], [0, 0, 220, 1080], [1844, 280, 76, 115],[1844, 664, 76, 115], [0, -20, 1920, 35]],
	rioters : [],
	app : false,
	crs : [],
	life : 1000,
	crs_limit: 5,
	"delay_man" : 3500,
	glob_x : 0,
	glob_y : 0,
	statut : 0,
	pause : 0,
	score_pos: 1920,
	up_fix : 0,
	end: 0,
	end_time:0,
	death: [],
	explosion : {x : -1, y : -1, anim : 0, limit : 0, zone : -1},
	anim_explo : 0,
	speed_zombie : 2
};

function add_death(x, y, id)
{
	data.death.push({x: x, y : y, a : 0, id : id, tmp : 0});
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function je_suis_un_zombie(obj)
{
	if (!obj._jm)
	{
		obj._speed = data.speed_zombie;
		obj._hp = 1;
		obj._items[0].pts = 45;
		obj._zombie = true;
	}
	return (obj);
}

function je_suis_jean_marie(obj)
{
	obj._speed = 2;
	obj._hp = 909999999;
	obj._items[0].pts = 1;
	obj._jm = true;
	return (obj);
}

function make_rioter(id, x, y)
{
	var rd = [[55, 258 - 40], [436, 640 - 40], [819, 1022 - 40]];
	var pos = getRandomInt(0, 3);
	if (typeof(x) == 'undefined')
		x = 1920;
	if (typeof(y) == 'undefined')
		y = getRandomArbitrary(rd[pos][0], rd[pos][1]);
	var obj = {
		"_id" : id,
		"_hp" : 100,
		"_x" : x,
		"_y" : y,
		"_items" : [{pts:20, name: "Caillou"}],
		"_type" : getRandomInt(0, 5),
		"_speed" : getRandomInt(2, 4),
		"_direction" : 2,
		"_last_direction" : 2,
		"_annim" : 0,
		"_annim_id" : 1,
		"_zombie" : ((getRandomInt(0, 199)) == 1),
		"_jm" : ((getRandomInt(0, 350)) == 1)
	};
	if (obj._zombie)
		obj = je_suis_un_zombie(obj);
	if (obj._jm)
		obj = je_suis_jean_marie(obj);
	return (obj);
}

function make_crs(id, x, y)
{
	var obj = {
		"_id" : id,
		"_hp" : 350,
		"_x" : x,
		"_y" : y,
		"_items" : [{pts:30, name: "Mattraque"}],
		"_name" : 'Jacques X',
		"_type" : 0,
		"_direction" : 3,
		"_time" : 0,
		"_limit" : 3,
		"_annim" : 0,
		"_annim_id" : 3,
		"_menu": 0,
		"_movable" : 0
	}
	return (obj);
}

var tmp = 0;

function render()
{
	if (data.statut == 0)
	{
		ctx.drawImage(assets.title, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
	}
	if (data.statut == 1)
	{
		ctx.drawImage(assets.background, 0, 0, 1920, 1080, 0, 0, 1920, 1080);	
		for (var i = 0; i < data.rioters.length; i++)
		{
			var pict = [assets.rioter, assets.rioter2, assets.rioter3, assets.rioter4, assets.rioter5];
			if (data.rioters[i]._zombie)
				ctx.drawImage(assets.zombie, data.rioters[i]._annim * 40, 40 * data.rioters[i]._annim_id, 40, 40, data.rioters[i]._x, data.rioters[i]._y, 40, 40);
			else if (data.rioters[i]._jm)
				ctx.drawImage(assets.jmlp, data.rioters[i]._annim * 40, 40 * data.rioters[i]._annim_id, 40, 40, data.rioters[i]._x, data.rioters[i]._y, 40, 40);
			else
				ctx.drawImage(pict[data.rioters[i]._type], data.rioters[i]._annim * 40, 40 * data.rioters[i]._annim_id, 40, 40, data.rioters[i]._x, data.rioters[i]._y, 40, 40);
			if (tmp % 4 == 0)
				data.rioters[i]._annim = (data.rioters[i]._annim + 1) % 4;
		}
		var ratio = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
		for (var i = 0; i < data.crs.length; i++)
		{
			var img = [assets.crs, assets.crs2, assets.crs3];
			var img2 = [assets.crsr, assets.crsr2, assets.crsr3];
			if (data.crs[i]._movable == 0)
			{
				if (data.crs[i]._hp > 100)
					ctx.drawImage(img[data.crs[i]._type], data.crs[i]._annim * 40, 40 * data.crs[i]._annim_id, 40, 40, data.crs[i]._x, data.crs[i]._y, 40, 40);
				else
					ctx.drawImage(img2[data.crs[i]._type], data.crs[i]._annim * 40, 40 * data.crs[i]._annim_id, 40, 40, data.crs[i]._x, data.crs[i]._y, 40, 40);
			}
			if (tmp % 4 == 0)
				data.crs[i]._annim = (data.crs[i]._annim + 1) % 4;
		}
		
		for (var i = 0; i < data.death.length; i++)
		{
			ctx.drawImage(assets.death, data.death[i].a * 40, data.death[i].id * 40, 40, 40, data.death[i].x, data.death[i].y, 40, 40);
			if (data.death[i].tmp % 4 == 0)
				data.death[i].a = (data.death[i].a + 1) % 5;
			data.death[i].tmp++;
			if (data.death[i].a >= 4)
				data.death.splice(i, 1);
		}
		
		ctx.drawImage(assets.mairie, 0, 0, 219, 1025, 0, 0, 219, 1025);
		ctx.drawImage(assets.toit, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
		
		if (data.explosion.x > -1)
		{
			ctx.drawImage(assets.explosion, data.explosion.anim * 80, 0, 80, 80, data.explosion.x, data.explosion.y, 175, 175);
			if (data.anim_explo > 18)
			{
			data.explosion.anim += 1;
			data.anim_explo = 0;
			}
			data.anim_explo += 1;
			if (data.explosion.anim == 3)
			{
				kill_them_all();
				data.explosion.x = -1;
			}
		}
		
		for (var i = 0; i < data.rioters.length; i++)
		{
			if (data.rioters[i]._jm)
			{
				if (data.rioters[i]._annim_id == 0)
					ctx.drawImage(assets.bulle, 0, 0, 70, 70, data.rioters[i]._x - 60, data.rioters[i]._y - 65, 70, 70);
			}
		}
		
		for (var i = 0; i < data.crs.length; i++)
		{
			if (data.crs[i]._menu == 1)
			{
				ctx.drawImage(assets.menu, 0, 0, 160, 40, data.crs[i]._x - 65, data.crs[i]._y - 45, 160, 40);
				ctx.drawImage(assets.menu, 0, 40, 72, 32, data.crs[i]._x - 60, data.crs[i]._y - 40, 72, 32);
				if (data.up_fix >= 10 && data.crs[i]._type < 2)
					ctx.drawImage(assets.menu, 0, 72, 72, 32, data.crs[i]._x + 18, data.crs[i]._y - 40, 72, 32);
				else
					ctx.drawImage(assets.menu, 0, 104, 72, 32, data.crs[i]._x + 18, data.crs[i]._y - 40, 72, 32);
			}
		}
		show_info();
		tmp++;
		
		var x = (data.glob_x - Math.abs(parseInt(document.body.style.left))) / (1920 * ratio) * 1920;
		var y = (data.glob_y - Math.abs(parseInt(document.body.style.top))) / (1080 * ratio) * 1080;
		for (var i = 0; i < data.crs.length; i++)
		{
			var img = [assets.crst, assets.crst2, assets.crst3];
			if (data.crs[i]._movable == 1)
				ctx.drawImage(img[data.crs[i]._type], data.crs[i]._annim * 40, 40 * data.crs[i]._annim_id, 40, 40, x - 20, y - 20, 40, 40);
		}
		
		if (data.pause == 1)
			ctx.drawImage(assets.pause, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
	}
	if (data.statut == 2)
	{
		if (data.end_time < 300)
			data.end_time++;
		if (data.end == 0)
		{
			ctx.drawImage(assets.gameover, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
			ctx.fillStyle = "black";
		}
		else
		{
			ctx.fillStyle = "white";
			ctx.drawImage(assets.gameover2, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
		}
		
		
		ctx.font = "35pt MyFont";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText(tempsChrono(), 1400, 200);
		
		show_score();
	}
}

//var rect1 = {x: 5, y: 5, width: 50, height: 50}
//var rect2 = {x: 20, y: 10, width: 10, height: 10}
function collision(rect1, rect2)
{
	if (rect1.x < rect2.x + rect2.width &&
	   rect1.x + rect1.width > rect2.x &&
	   rect1.y < rect2.y + rect2.height &&
	   rect1.height + rect1.y > rect2.y) {
			return (true);
	}
	return (false);
}

function save_score()
{
	var name = document.getElementById('name').value;
	document.getElementById('name').style.display = "none";
	if (name != '')
	{
		document.getElementById('name').value = "";
		var arr = localStorage.getItem('scores');
		if (arr == null || arr.length <= 0 || arr == false)
			arr = '[]';
		arr = JSON.parse(arr);
		if (arr == null)
			arr = [];
		arr.push([name, tempsChrono()]);
		function sortfunction(a, b)
		{
			if (a[1] == b[1])
				return (0);
			if (a[1] > b[1])
				return (-1);
			return (1);
		}
		
		arr.sort(sortfunction);
		localStorage.setItem('scores', JSON.stringify(arr));
		data.score_pos = 1920;
	}
}

function update()
{
	if (data.pause == 1)
		return (false);
	if (data.statut != 1)
		return (false);
	for (var i = 0; i < data.rioters.length; i++)
	{
		if ((dir = move(data.rioters[i])) != -1)
		{
			var ld = dir;
			if (data.rioters[i]._last_direction == 0 && ld == 1 || data.rioters[i]._last_direction == 1 && ld == 0)
				ld = 2;
			data.rioters[i]._last_direction = data.rioters[i]._direction;
			data.rioters[i]._direction = ld;
		}
		var chk = 0;
		if ((chk = check_mairie(data.rioters[i])) != -1)
		{
			data.life = data.life - chk;
			data.rioters[i]._items[0].pts = 0;
				if (data.life <= 0)
				{
					if (data.rioters[i]._zombie)
						data.end = 1;
					data.statut = 2;
					arreterChrono();
					document.getElementById('name').focus();
					document.getElementById('name').style.display = "block";
				}
		}
		var coll = false;
		for (var j = 0; j < data.rioters[i]._speed && !coll; j++)
		{
			for (var k = 0; k < data.crs.length && !coll; k++)
			{
				if (data.crs[k]._movable == 0 && collision({x: data.crs[k]._x, y: data.crs[k]._y, width: 40, height: 40}, {x: data.rioters[i]._x - 1, y: data.rioters[i]._y, width: 40, height: 40}))
				{
					coll = true;
					break;
				}
			}
			if (coll)
				data.rioters[i]._annim_id = 0;
			else
				data.rioters[i]._annim_id = 1;
			if (!coll && data.rioters[i]._direction == 2)
				data.rioters[i]._x -= j;
			if (!coll && data.rioters[i]._direction == 3)
				data.rioters[i]._x += j;
			if (!coll && data.rioters[i]._direction == 0)
				data.rioters[i]._y -= j;
			if (!coll && data.rioters[i]._direction == 1)
				data.rioters[i]._y += j;
		}
	}
	function sortfunction(a, b){
		if (a._y == b._y)
			return 0;
		if (a._y > b._y)
			return (1);
		return (-1);
	}
	zombie_propa();
	data.rioters.sort(sortfunction);
	data.crs.sort(sortfunction);
	function sortfunction2(a, b){
		if (a.y == b.y)
			return 0;
		if (a.y > b.y)
			return (1);
		return (-1);
	}
	data.death.sort(sortfunction2);
	clear();
}

function add_manouche()
{
	if (data.pause != 1)
		data.rioters.push(make_rioter(data.rioters.length));
	setTimeout(function(){ add_manouche(); }, data.delay_man);
}


function make_explosion()
{
	var stk;
	
	if (data.explosion.limit < 5)
	{
	stk = getRandomInt(0, 3);
	if (stk == 0)
		data.explosion = {x : 1680, y : 280, anim : 0, limit : data.explosion.limit + 1, zone : 0};
	if (stk == 1)
		data.explosion = {x : 1680, y : 660, anim : 0, limit : data.explosion.limit + 1, zone : 1};
	if (stk == 2)
		data.explosion = {x : 960, y : 280, anim : 0, limit : data.explosion.limit + 1, zone : 2};
	if (stk == 3)
		data.explosion = {x : 960, y : 660, anim : 0, limit : data.explosion.limit + 1, zone : 3};
	}
}

function kill_them_all()
{
	for (var i = 0; i < data.rioters.length; i++)
	{
		if (!data.rioters[i]._jm && collision({x: data.rioters[i]._x, y: data.rioters[i]._y, width: 40, height: 40}, {x: data.explosion.x, y: data.explosion.y, width: 175, height: 175}))
		{
			if (data.rioters[i]._zombie)
				add_death(data.rioters[i]._x, data.rioters[i]._y, 8);
			else
			{
				if (data.rioters[i]._type == 0)
					add_death(data.rioters[i]._x, data.rioters[i]._y, 3);
				if (data.rioters[i]._type == 1)
					add_death(data.rioters[i]._x, data.rioters[i]._y, 4);
				if (data.rioters[i]._type == 2)
					add_death(data.rioters[i]._x, data.rioters[i]._y, 5);
				if (data.rioters[i]._type == 3)
					add_death(data.rioters[i]._x, data.rioters[i]._y, 6);
				if (data.rioters[i]._type == 4)
					add_death(data.rioters[i]._x, data.rioters[i]._y, 7);
			}			
			data.rioters.splice(i, 1);
		}
	}
	for (var i = 0; i < data.crs.length; i++)
	{	
		if (collision({x: data.crs[i]._x, y: data.crs[i]._y, width: 40, height: 40}, {x: data.explosion.x, y: data.explosion.y, width: 175, height: 175}))
		{
			if (data.crs[i]._type == 0)
				add_death(data.crs[i]._x, data.crs[i]._y, 0);
			if (data.crs[i]._type == 1)
				add_death(data.crs[i]._x, data.crs[i]._y, 1);
			if (data.crs[i]._type == 2)
				add_death(data.crs[i]._x, data.crs[i]._y, 2);
			data.crs.splice(i, 1)
		}	
	}
}


function clear()
{
	for (var i = 0; i < data.rioters.length; i++)
	{
		if (data.rioters[i]._x < -40 || data.rioters[i]._x > 2000 || data.rioters[i]._y < -40 || data.rioters[i]._y > 1120)
			data.rioters.splice(i, 1);
	}
	for (var i = 0; i < data.crs.length; i++)
	{
		if (data.crs[i]._x < -40 || data.crs[i]._x > 2000 || data.crs[i]._y < -40 || data.crs[i]._y > 1120)
			data.crs.splice(i, 1);
	}
}

function zombie_propa()
{
	for (var i = 0; i < data.rioters.length; i++)
	{
		if (data.rioters[i]._zombie)
		{
			for (var j = 0; j < data.rioters.length; j++)
			{
				if (!data.rioters[j]._zombie && !data.rioters[j]._jm && collision({x: data.rioters[i]._x, y: data.rioters[i]._y, width: 40, height: 40}, {x: data.rioters[j]._x, y: data.rioters[j]._y, width: 40, height: 40}))
				{
					data.rioters[j] = je_suis_un_zombie(data.rioters[j]);
				}
			}
		}
	}
}

// Attack loop
function imabadguy()
{
	if (data.pause == 1)
		return (false);
	
	// Manouche attack
	for (var i = 0; i < data.rioters.length; i++)
	{
		for (var k = 0; k < data.crs.length; k++)
		{
			if (data.crs[k]._movable == 0 && collision({x: data.crs[k]._x, y: data.crs[k]._y, width: 40, height: 40}, {x: data.rioters[i]._x - 1, y: data.rioters[i]._y, width: 40, height: 40}))
			{
				data.crs[k]._hp -= data.rioters[i]._items[0].pts;
				if (data.crs[k]._hp <= 0)
				{
					if (data.rioters[i]._zombie && getRandomInt(0, 10) == 0)
						data.rioters.push(je_suis_un_zombie(make_rioter(data.rioters.length, data.crs[k]._x, data.crs[k]._y)));
					else
					{
						if (data.crs[k]._type == 0)
							add_death(data.crs[k]._x, data.crs[k]._y, 0);
						if (data.crs[k]._type == 1)
							add_death(data.crs[k]._x, data.crs[k]._y, 1);
						if (data.crs[k]._type == 2)
							add_death(data.crs[k]._x, data.crs[k]._y, 2);
						data.crs.splice(k, 1);
					}
				}
				break;
			}
		}
	}
	
	// CRS
	for (var k = 0; k < data.crs.length; k++)
	{
		var nb = 0;
		data.crs[k]._annim_id = 3;
		for (var i = 0; i < data.rioters.length; i++)
		{
			if (data.crs[k]._movable == 0 && collision({x: data.crs[k]._x, y: data.crs[k]._y, width: 40, height: 40}, {x: data.rioters[i]._x - 1, y: data.rioters[i]._y, width: 40, height: 40}))
			{
				data.rioters[i]._hp -= data.crs[k]._items[0].pts;
				nb++;
				data.crs[k]._annim_id = 2;
				if (data.rioters[i]._hp <= 0)
				{	
					data.up_fix += 1;
					if (data.rioters[i]._zombie)
						add_death(data.rioters[i]._x, data.rioters[i]._y, 8);
					else
					{
						if (data.rioters[i]._type == 0)
							add_death(data.rioters[i]._x, data.rioters[i]._y, 3);
						if (data.rioters[i]._type == 1)
							add_death(data.rioters[i]._x, data.rioters[i]._y, 4);
						if (data.rioters[i]._type == 2)
							add_death(data.rioters[i]._x, data.rioters[i]._y, 5);
						if (data.rioters[i]._type == 3)
							add_death(data.rioters[i]._x, data.rioters[i]._y, 6);
						if (data.rioters[i]._type == 4)
							add_death(data.rioters[i]._x, data.rioters[i]._y, 7);
					}
					data.rioters.splice(i, 1);
				}
				if (nb == data.crs[k]._limit)
					break;
			}
		}
	}
}

function init()
{
	add_manouche();
	demarrerChrono();
	setTimeout(function(){ add_manouche(); }, data.delay_man);
	setInterval(function() {
		if (data.speed_zombie == 2)
			data.speed_zombie = 3;
		else
			data.speed_zombie = 2;
		for (var i = 0; i < data.rioters.length; i++)
		{
			if (data.rioters[i]._zombie)
				data.rioters[i]._speed = data.speed_zombie;
		}
	}, 300000);
	setInterval(function(){ imabadguy(); }, 500);
	setInterval(function(){
		if (data.delay_man > 500)
		{
			if (data.pause == 0)
				data.delay_man -= 5;
		}
	}, 300);
	setInterval(function(){
		if (getRandomInt(0, 200) == 1)
		{
			if (data.pause == 0)
				make_explosion();
		}
	}, 1000);
	setInterval(function(){
		if (data.pause == 0)
			data.crs_limit++;
	}, 3000);
	window.onkeydown = function(e) {
		if (data.statut == 1 && (e.keyCode == 13 || e.keyCode == 8 || e.keyCode == 27 || e.keyCode == 19 || e.keyCode == 32))
		{
			if (data.pause == 1)
			{
				demarrerChrono();
				data.pause = 0;
			}
			else
			{
				arreterChrono();
				data.pause = 1;
			}
		}
	};
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function show_score()
{	
	var sc = localStorage.getItem('scores');

	if (sc == '' || sc == '[]' || (arr = JSON.parse(sc)) == null)
		var text = "It seens that you didn't block all of the rioters, isn't it ?";
	else
	{
		var text = "Scores : ";
		for (var i = 0; i < arr.length && i < 10; i++)
		{
			text += arr[i][0] + " " + arr[i][1].substring(0, arr[i][1].length - 3);
			if (i != arr.length - 1 && i < 9)
				text += " | ";
		}
	}
	ctx.font = "20pt MyFont";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillStyle = "white";
	var len = ctx.measureText(text).width;
	var pos = 1920;
	ctx.fillText(text,data.score_pos,1025);
	if (data.score_pos > -len)
		data.score_pos -= 2;
	else
		data.score_pos = 1920;
}

function show_info()
{
	var text = "Life: "+ Math.round(((data.life) / 1000) * 100) + "%";
	ctx.font = "13pt MyFont";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillStyle = "dark";
	ctx.fillText(text,110,960);
	text = "CRS: "+data.crs_limit + " | Boosts: "+ ~~(data.up_fix / 10);
	ctx.fillText(text,110,990);
	
	// Chrono
	var text = tempsChrono();
	text = text.substring(0, text.length - 3)
	ctx.font = "20pt MyFont";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillStyle = "black";
	ctx.fillText(text,1840,15);
}

function loop(){
  requestAnimFrame(loop);
  render();
  update();
}

function getPosition(event)
{
	if (data.pause == 1)
	{
		demarrerChrono();
		data.pause = 0;
		return (false);
	}
	
	if (data.statut == 0)
	{
		data.statut = 1;
		init();
		return (false);
	}
	if (data.statut == 2 && data.end_time >= 299)
	{
		location.reload();
		return (false);
	}	
	if (data.pause == 1)
		return (false);
	
	//var canvas = document.getElementById("canvas");
	
	var ratio = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
	var x = (data.glob_x - Math.abs(parseInt(document.body.style.left))) / (1920 * ratio) * 1920;
	var y = (data.glob_y - Math.abs(parseInt(document.body.style.top))) / (1080 * ratio) * 1080;
	
	x -= 20;
	y -= 20;
	
	var back = false;

	// Clic droit
	if (event.button != 0)
	{
		// Ouverture/Fermeture menu		
		var ok = false;
		for (var k = data.crs.length - 1; k >= 0; k--)
		{
			var nb = 0;
			if (collision({x: data.crs[k]._x - 20, y: data.crs[k]._y - 20, width: 40, height: 40}, {x: x, y: y, width: 1, height: 1}) && !ok)
			{
				data.crs[k]._menu = !data.crs[k]._menu;
				if (data.crs[k]._menu == 1)
					ok = true;
			}
			else
				data.crs[k]._menu = 0;
		}
	}
	
	// Zones bloquées
	for (var i = 0; i < data.collider.length; i++)
	{
		if (collision({x: data.collider[i][0], y: data.collider[i][1], width: data.collider[i][2], height: data.collider[i][3]}, {x: x, y: y, width: 1, height: 1}))
			back = true;
	}
	
	
	// Clic gauche
	if (event.button == 0)
	{
		var clic = false;
		for (var k = data.crs.length - 1; k >= 0; k--)
		{
			if (collision({x: data.crs[k]._x - 60 - 20, y: data.crs[k]._y - 40 - 20, width: 72, height: 32}, {x: x, y: y, width: 1, height: 1}))
			{
				for (var j = data.crs.length - 1; j >= 0; j--)
				{
					if (data.crs[j]._menu == 1)
					{
						data.crs[j]._movable = 1;
						clic = true;
					}
				}
			}
		}
		
		// upgrade
		if (data.up_fix >= 10)
		{
			for (var k = data.crs.length - 1; k >= 0; k--)
			{
				if (collision({x: data.crs[k]._x, y: data.crs[k]._y - 40 - 20, width: 72, height: 32}, {x: x, y: y, width: 1, height: 1}) && data.crs[k]._type < 2)
				{
					for (var j = data.crs.length - 1; j >= 0; j--)
					{
						if (data.crs[j]._menu == 1)
						{
							data.crs[j] = upgrade(data.crs[j]);
							data.up_fix -= 10;
							return (false);
						}
					}
				}
			}
		}
		
		for (var k = data.crs.length - 1; k >= 0; k--)
		{
			if (data.crs[k]._menu == 1)
				clic = true;
			data.crs[k]._menu = 0;
		}
		
		if (clic)
			return (false);
		
		// Detect crs à deplacer
		var ok = -1;
		for (var j = data.crs.length - 1; j >= 0; j--)
		{
			if (data.crs[j]._movable == 1)
			{
				ok = j;
			}
		}
		
		// Move new CRS
		if (back == false && ok >= 0)
		{
			data.crs[ok]._movable = 0;
			data.crs[ok]._x = x;
			data.crs[ok]._y = y;
			return (false);
		}
		
		// Add new CRS
		if (back == false && data.crs_limit && !clic)
		{
			data.crs.push(make_crs(data.crs.length, x, y));
			data.crs_limit--;
		}
	}
}


function upgrade (crs)
{
	if (crs._type == 0)
	{
		crs._type = 1;
		crs._items[0].pts = 50;
		crs._hp = 500;
		crs._limit = 4;
		return (crs);
	}
	if (crs._type == 1)
	{
		crs._type = 2;
		crs._items[0].pts = 80;
		crs._hp = 650;
		crs._limit = 5;
		return (crs);
	}
	return (crs);
}

window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	document.getElementById("canvas").addEventListener("mousedown", getPosition, false);
	canvas.oncontextmenu = function (e) {
		e.preventDefault();
	};
	canvas.addEventListener('mousemove', function(evt) {
		data.glob_x = evt.clientX;
		data.glob_y = evt.clientY;
	}, false);
	document.getElementById('name').addEventListener('keydown', function(event) {
	    if (event.keyCode == 13) {
	        save_score();
	        document.getElementById('name').style.display = 'none';
	    }
	}, false);
	assets = {};
	assets.rioter = new Image();
	assets.rioter.src = "assets/pictures/rioter1.png";
	assets.rioter2 = new Image();
	assets.rioter2.src = "assets/pictures/rioter2.png";
	assets.rioter3 = new Image();
	assets.rioter3.src = "assets/pictures/rioter3.png";
	assets.rioter4 = new Image();
	assets.rioter4.src = "assets/pictures/rioter4.png";
	assets.rioter5 = new Image();
	assets.rioter5.src = "assets/pictures/rioter5.png";
	assets.zombie = new Image();
	assets.zombie.src = "assets/pictures/zombie.png";
	assets.crs = new Image();
	assets.crs.src = "assets/pictures/crs.png";
	assets.crs2 = new Image();
	assets.crs2.src = "assets/pictures/crs2.png";
	assets.crs3 = new Image();
	assets.crs3.src = "assets/pictures/crs3.png";
	assets.crst = new Image();
	assets.crst.src = "assets/pictures/crs_t.png";
	assets.crst2 = new Image();
	assets.crst2.src = "assets/pictures/crs2_t.png";
	assets.crst3 = new Image();
	assets.crst3.src = "assets/pictures/crs3_t.png";
	assets.crsr = new Image();
	assets.crsr.src = "assets/pictures/crs_r.png";
	assets.crsr2 = new Image();
	assets.crsr2.src = "assets/pictures/crs2_r.png";
	assets.crsr3 = new Image();
	assets.crsr3.src = "assets/pictures/crs3_r.png";
	assets.jmlp = new Image();
	assets.jmlp.src = "assets/pictures/jmlp.png";
	assets.bulle = new Image();
	assets.bulle.src = "assets/pictures/bulle.png";
	assets.background = new Image();
	assets.background.src = "assets/pictures/background.png";
	assets.mairie = new Image();
	assets.mairie.src = "assets/pictures/mairie.png";
	assets.toit = new Image();
	assets.toit.src = "assets/pictures/toit.png";
	assets.menu = new Image();
	assets.menu.src = "assets/pictures/menu.png";
	assets.title = new Image();
	assets.title.src = "assets/pictures/title.png";
	assets.gameover = new Image();
	assets.gameover.src = "assets/pictures/gameover.png";
	assets.gameover2 = new Image();
	assets.gameover2.src = "assets/pictures/gameover2.png";
	assets.pause = new Image();
	if (data.app)
		assets.pause.src = "assets/pictures/pause_app.png";
	else
		assets.pause.src = "assets/pictures/pause.png";
	assets.death = new Image();
	assets.death.src = "assets/pictures/death.png";
	assets.explosion = new Image();
	assets.explosion.src = "assets/pictures/explosion.png";	
	loop();
}

function resize()
{
	var x = window.innerWidth;
	var y = window.innerHeight;
	var ratio = Math.min(x / 1920, y / 1080);
	document.body.style.backgroundColor = "#000";
	document.body.style.width = "1920px";
	document.body.style.height = "1080px";
	document.body.style.transform = "scale("+ratio+")";
	document.body.style.position = 'fixed';
	var mX = -((1920 * (1 - ratio)) / 2);
	var mY = -((1080 * (1 - ratio)) / 2);
	var dX = Math.abs((1920 * ratio) - x) / 2;
	var dY = Math.abs((1080 * ratio) - y) / 2;
	document.body.style.marginLeft = mX + 'px';
	document.body.style.marginRight = mX + 'px';
	document.body.style.marginTop = mY + 'px';
	document.body.style.marginBottom = mY + 'px';
	document.body.style.left = dX + 'px';
	document.body.style.top = dY + 'px';
}

window.addEventListener("resize", resize, false);
window.addEventListener("load", resize, false);
window.oncontextmenu = function() {return false;}