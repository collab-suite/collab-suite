select * from active_users au
join users u on au.user_id = u.user_id
join active_rooms ar on au.room_id = ar.ar_id
where ar.ar_id = ${room_id}