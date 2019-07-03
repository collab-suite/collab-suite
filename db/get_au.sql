select * from active_users au
join users u on au.user_id = u.user_id
where au.room_id = ${room_id}